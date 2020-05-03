CREATE SCHEMA schema;
CREATE FUNCTION schema.hc_capture_insert_from_row(source_row public.hstore, table_name character varying, excluded_cols text[] DEFAULT ARRAY[]::text[]) RETURNS integer
    LANGUAGE plpgsql
    AS $$
        DECLARE
            excluded_cols_standard text[] = ARRAY['_hc_lastop', '_hc_err']::text[];
            retval int;
        BEGIN
            -- VERSION 1 --
            IF (source_row -> 'id') IS NULL THEN
                -- source_row is required to have an int id value
                RETURN NULL;
            END IF;
            excluded_cols_standard := array_remove(
                array_remove(excluded_cols, 'id'), 'sfid') || excluded_cols_standard;
            INSERT INTO "schema"."_trigger_log" (
                action, table_name, txid, created_at, state, record_id, values)
            VALUES (
                'INSERT', table_name, txid_current(), clock_timestamp(), 'NEW',
                (source_row -> 'id')::int,
                source_row - excluded_cols_standard
            ) RETURNING id INTO retval;
            RETURN retval;
        END;
        $$;
CREATE FUNCTION schema.hc_capture_update_from_row(source_row public.hstore, table_name character varying, columns_to_include text[] DEFAULT ARRAY[]::text[]) RETURNS integer
    LANGUAGE plpgsql
    AS $$
        DECLARE
            excluded_cols_standard text[] = ARRAY['_hc_lastop', '_hc_err']::text[];
            excluded_cols text[];
            retval int;
        BEGIN
            -- VERSION 1 --
            IF (source_row -> 'id') IS NULL THEN
                -- source_row is required to have an int id value
                RETURN NULL;
            END IF;
            IF array_length(columns_to_include, 1) <> 0 THEN
                excluded_cols := array(
                    select skeys(source_row)
                    except
                    select unnest(columns_to_include)
                );
            END IF;
            excluded_cols_standard := excluded_cols || excluded_cols_standard;
            INSERT INTO "schema"."_trigger_log" (
                action, table_name, txid, created_at, state, record_id, sfid, values, old)
            VALUES (
                'UPDATE', table_name, txid_current(), clock_timestamp(), 'NEW',
                (source_row -> 'id')::int, source_row -> 'sfid',
                source_row - excluded_cols_standard, NULL
            ) RETURNING id INTO retval;
            RETURN retval;
        END;
        $$;
CREATE FUNCTION schema.hc_client_contact__c_logger() RETURNS trigger
    LANGUAGE plpgsql
    AS $$
        DECLARE
            trigger_row "schema"."_trigger_log";
            excluded_cols text[] = ARRAY['_hc_lastop', '_hc_err']::text[];
        BEGIN
            -- VERSION 4 --
            trigger_row = ROW();
            trigger_row.id = nextval('"schema"."_trigger_log_id_seq"');
            trigger_row.action = TG_OP::text;
            trigger_row.table_name = TG_TABLE_NAME::text;
            trigger_row.txid = txid_current();
            trigger_row.created_at = clock_timestamp();
            trigger_row.state = 'READONLY';
            IF (TG_OP = 'DELETE') THEN
                trigger_row.record_id = OLD.id;
                trigger_row.old = hstore(OLD.*) - excluded_cols;
                IF (OLD.sfid IS NOT NULL) THEN
                    trigger_row.sfid = OLD.sfid;
                END IF;
            ELSEIF (TG_OP = 'INSERT') THEN
                trigger_row.record_id = NEW.id;
                trigger_row.values = hstore(NEW.*) - excluded_cols;
            ELSEIF (TG_OP = 'UPDATE') THEN
                trigger_row.record_id = NEW.id;
                trigger_row.old = hstore(OLD.*) - excluded_cols;
                trigger_row.values = (hstore(NEW.*) - hstore(trigger_row.old)) - excluded_cols;
                IF (OLD.sfid IS NOT NULL) THEN
                    trigger_row.sfid = OLD.sfid;
                END IF;
            END IF;
            INSERT INTO "schema"."_trigger_log" VALUES (trigger_row.*);
            RETURN NULL;
        END;
        $$;
CREATE FUNCTION schema.hc_client_contact__c_status() RETURNS trigger
    LANGUAGE plpgsql
    AS $$
                    BEGIN
                      IF (get_xmlbinary() = 'base64') THEN  -- user op
                        NEW._hc_lastop = 'PENDING';
                        NEW._hc_err = NULL;
                        RETURN NEW;
                      ELSE  -- connect op
                        IF (TG_OP = 'UPDATE' AND NEW._hc_lastop IS NOT NULL AND NEW._hc_lastop != OLD._hc_lastop) THEN
                            RETURN NEW;
                        END IF;
                        NEW._hc_lastop = 'SYNCED';
                        NEW._hc_err = NULL;
                        RETURN NEW;
                      END IF;
                    END;
                 $$;
CREATE FUNCTION schema.hc_contact_logger() RETURNS trigger
    LANGUAGE plpgsql
    AS $$
        DECLARE
            trigger_row "schema"."_trigger_log";
            excluded_cols text[] = ARRAY['_hc_lastop', '_hc_err']::text[];
        BEGIN
            -- VERSION 4 --
            trigger_row = ROW();
            trigger_row.id = nextval('"schema"."_trigger_log_id_seq"');
            trigger_row.action = TG_OP::text;
            trigger_row.table_name = TG_TABLE_NAME::text;
            trigger_row.txid = txid_current();
            trigger_row.created_at = clock_timestamp();
            trigger_row.state = 'READONLY';
            IF (TG_OP = 'DELETE') THEN
                trigger_row.record_id = OLD.id;
                trigger_row.old = hstore(OLD.*) - excluded_cols;
                IF (OLD.sfid IS NOT NULL) THEN
                    trigger_row.sfid = OLD.sfid;
                END IF;
            ELSEIF (TG_OP = 'INSERT') THEN
                trigger_row.record_id = NEW.id;
                trigger_row.values = hstore(NEW.*) - excluded_cols;
            ELSEIF (TG_OP = 'UPDATE') THEN
                trigger_row.record_id = NEW.id;
                trigger_row.old = hstore(OLD.*) - excluded_cols;
                trigger_row.values = (hstore(NEW.*) - hstore(trigger_row.old)) - excluded_cols;
                IF (OLD.sfid IS NOT NULL) THEN
                    trigger_row.sfid = OLD.sfid;
                END IF;
            END IF;
            INSERT INTO "schema"."_trigger_log" VALUES (trigger_row.*);
            RETURN NULL;
        END;
        $$;
CREATE FUNCTION schema.hc_contact_status() RETURNS trigger
    LANGUAGE plpgsql
    AS $$
                    BEGIN
                      IF (get_xmlbinary() = 'base64') THEN  -- user op
                        NEW._hc_lastop = 'PENDING';
                        NEW._hc_err = NULL;
                        RETURN NEW;
                      ELSE  -- connect op
                        IF (TG_OP = 'UPDATE' AND NEW._hc_lastop IS NOT NULL AND NEW._hc_lastop != OLD._hc_lastop) THEN
                            RETURN NEW;
                        END IF;
                        NEW._hc_lastop = 'SYNCED';
                        NEW._hc_err = NULL;
                        RETURN NEW;
                      END IF;
                    END;
                 $$;
CREATE FUNCTION schema.hc_infrm__action__c_logger() RETURNS trigger
    LANGUAGE plpgsql
    AS $$
        DECLARE
            trigger_row "schema"."_trigger_log";
            excluded_cols text[] = ARRAY['_hc_lastop', '_hc_err']::text[];
        BEGIN
            -- VERSION 4 --
            trigger_row = ROW();
            trigger_row.id = nextval('"schema"."_trigger_log_id_seq"');
            trigger_row.action = TG_OP::text;
            trigger_row.table_name = TG_TABLE_NAME::text;
            trigger_row.txid = txid_current();
            trigger_row.created_at = clock_timestamp();
            trigger_row.state = 'READONLY';
            IF (TG_OP = 'DELETE') THEN
                trigger_row.record_id = OLD.id;
                trigger_row.old = hstore(OLD.*) - excluded_cols;
                IF (OLD.sfid IS NOT NULL) THEN
                    trigger_row.sfid = OLD.sfid;
                END IF;
            ELSEIF (TG_OP = 'INSERT') THEN
                trigger_row.record_id = NEW.id;
                trigger_row.values = hstore(NEW.*) - excluded_cols;
            ELSEIF (TG_OP = 'UPDATE') THEN
                trigger_row.record_id = NEW.id;
                trigger_row.old = hstore(OLD.*) - excluded_cols;
                trigger_row.values = (hstore(NEW.*) - hstore(trigger_row.old)) - excluded_cols;
                IF (OLD.sfid IS NOT NULL) THEN
                    trigger_row.sfid = OLD.sfid;
                END IF;
            END IF;
            INSERT INTO "schema"."_trigger_log" VALUES (trigger_row.*);
            RETURN NULL;
        END;
        $$;
CREATE FUNCTION schema.hc_infrm__action__c_status() RETURNS trigger
    LANGUAGE plpgsql
    AS $$
                    BEGIN
                      IF (get_xmlbinary() = 'base64') THEN  -- user op
                        NEW._hc_lastop = 'PENDING';
                        NEW._hc_err = NULL;
                        RETURN NEW;
                      ELSE  -- connect op
                        IF (TG_OP = 'UPDATE' AND NEW._hc_lastop IS NOT NULL AND NEW._hc_lastop != OLD._hc_lastop) THEN
                            RETURN NEW;
                        END IF;
                        NEW._hc_lastop = 'SYNCED';
                        NEW._hc_err = NULL;
                        RETURN NEW;
                      END IF;
                    END;
                 $$;
CREATE FUNCTION schema.hc_infrm__supportplan__c_logger() RETURNS trigger
    LANGUAGE plpgsql
    AS $$
        DECLARE
            trigger_row "schema"."_trigger_log";
            excluded_cols text[] = ARRAY['_hc_lastop', '_hc_err']::text[];
        BEGIN
            -- VERSION 4 --
            trigger_row = ROW();
            trigger_row.id = nextval('"schema"."_trigger_log_id_seq"');
            trigger_row.action = TG_OP::text;
            trigger_row.table_name = TG_TABLE_NAME::text;
            trigger_row.txid = txid_current();
            trigger_row.created_at = clock_timestamp();
            trigger_row.state = 'READONLY';
            IF (TG_OP = 'DELETE') THEN
                trigger_row.record_id = OLD.id;
                trigger_row.old = hstore(OLD.*) - excluded_cols;
                IF (OLD.sfid IS NOT NULL) THEN
                    trigger_row.sfid = OLD.sfid;
                END IF;
            ELSEIF (TG_OP = 'INSERT') THEN
                trigger_row.record_id = NEW.id;
                trigger_row.values = hstore(NEW.*) - excluded_cols;
            ELSEIF (TG_OP = 'UPDATE') THEN
                trigger_row.record_id = NEW.id;
                trigger_row.old = hstore(OLD.*) - excluded_cols;
                trigger_row.values = (hstore(NEW.*) - hstore(trigger_row.old)) - excluded_cols;
                IF (OLD.sfid IS NOT NULL) THEN
                    trigger_row.sfid = OLD.sfid;
                END IF;
            END IF;
            INSERT INTO "schema"."_trigger_log" VALUES (trigger_row.*);
            RETURN NULL;
        END;
        $$;
CREATE FUNCTION schema.hc_infrm__supportplan__c_status() RETURNS trigger
    LANGUAGE plpgsql
    AS $$
                    BEGIN
                      IF (get_xmlbinary() = 'base64') THEN  -- user op
                        NEW._hc_lastop = 'PENDING';
                        NEW._hc_err = NULL;
                        RETURN NEW;
                      ELSE  -- connect op
                        IF (TG_OP = 'UPDATE' AND NEW._hc_lastop IS NOT NULL AND NEW._hc_lastop != OLD._hc_lastop) THEN
                            RETURN NEW;
                        END IF;
                        NEW._hc_lastop = 'SYNCED';
                        NEW._hc_err = NULL;
                        RETURN NEW;
                      END IF;
                    END;
                 $$;
CREATE FUNCTION schema.hc_recordtype_logger() RETURNS trigger
    LANGUAGE plpgsql
    AS $$
        DECLARE
            trigger_row "schema"."_trigger_log";
            excluded_cols text[] = ARRAY['_hc_lastop', '_hc_err']::text[];
        BEGIN
            -- VERSION 4 --
            trigger_row = ROW();
            trigger_row.id = nextval('"schema"."_trigger_log_id_seq"');
            trigger_row.action = TG_OP::text;
            trigger_row.table_name = TG_TABLE_NAME::text;
            trigger_row.txid = txid_current();
            trigger_row.created_at = clock_timestamp();
            trigger_row.state = 'READONLY';
            IF (TG_OP = 'DELETE') THEN
                trigger_row.record_id = OLD.id;
                trigger_row.old = hstore(OLD.*) - excluded_cols;
                IF (OLD.sfid IS NOT NULL) THEN
                    trigger_row.sfid = OLD.sfid;
                END IF;
            ELSEIF (TG_OP = 'INSERT') THEN
                trigger_row.record_id = NEW.id;
                trigger_row.values = hstore(NEW.*) - excluded_cols;
            ELSEIF (TG_OP = 'UPDATE') THEN
                trigger_row.record_id = NEW.id;
                trigger_row.old = hstore(OLD.*) - excluded_cols;
                trigger_row.values = (hstore(NEW.*) - hstore(trigger_row.old)) - excluded_cols;
                IF (OLD.sfid IS NOT NULL) THEN
                    trigger_row.sfid = OLD.sfid;
                END IF;
            END IF;
            INSERT INTO "schema"."_trigger_log" VALUES (trigger_row.*);
            RETURN NULL;
        END;
        $$;
CREATE FUNCTION schema.hc_recordtype_status() RETURNS trigger
    LANGUAGE plpgsql
    AS $$
                    BEGIN
                      IF (get_xmlbinary() = 'base64') THEN  -- user op
                        NEW._hc_lastop = 'PENDING';
                        NEW._hc_err = NULL;
                        RETURN NEW;
                      ELSE  -- connect op
                        IF (TG_OP = 'UPDATE' AND NEW._hc_lastop IS NOT NULL AND NEW._hc_lastop != OLD._hc_lastop) THEN
                            RETURN NEW;
                        END IF;
                        NEW._hc_lastop = 'SYNCED';
                        NEW._hc_err = NULL;
                        RETURN NEW;
                      END IF;
                    END;
                 $$;
CREATE FUNCTION schema.hc_user_logger() RETURNS trigger
    LANGUAGE plpgsql
    AS $$
        DECLARE
            trigger_row "schema"."_trigger_log";
            excluded_cols text[] = ARRAY['_hc_lastop', '_hc_err']::text[];
        BEGIN
            -- VERSION 4 --
            trigger_row = ROW();
            trigger_row.id = nextval('"schema"."_trigger_log_id_seq"');
            trigger_row.action = TG_OP::text;
            trigger_row.table_name = TG_TABLE_NAME::text;
            trigger_row.txid = txid_current();
            trigger_row.created_at = clock_timestamp();
            trigger_row.state = 'READONLY';
            IF (TG_OP = 'DELETE') THEN
                trigger_row.record_id = OLD.id;
                trigger_row.old = hstore(OLD.*) - excluded_cols;
                IF (OLD.sfid IS NOT NULL) THEN
                    trigger_row.sfid = OLD.sfid;
                END IF;
            ELSEIF (TG_OP = 'INSERT') THEN
                trigger_row.record_id = NEW.id;
                trigger_row.values = hstore(NEW.*) - excluded_cols;
            ELSEIF (TG_OP = 'UPDATE') THEN
                trigger_row.record_id = NEW.id;
                trigger_row.old = hstore(OLD.*) - excluded_cols;
                trigger_row.values = (hstore(NEW.*) - hstore(trigger_row.old)) - excluded_cols;
                IF (OLD.sfid IS NOT NULL) THEN
                    trigger_row.sfid = OLD.sfid;
                END IF;
            END IF;
            INSERT INTO "schema"."_trigger_log" VALUES (trigger_row.*);
            RETURN NULL;
        END;
        $$;
CREATE FUNCTION schema.hc_user_status() RETURNS trigger
    LANGUAGE plpgsql
    AS $$
                    BEGIN
                      IF (get_xmlbinary() = 'base64') THEN  -- user op
                        NEW._hc_lastop = 'PENDING';
                        NEW._hc_err = NULL;
                        RETURN NEW;
                      ELSE  -- connect op
                        IF (TG_OP = 'UPDATE' AND NEW._hc_lastop IS NOT NULL AND NEW._hc_lastop != OLD._hc_lastop) THEN
                            RETURN NEW;
                        END IF;
                        NEW._hc_lastop = 'SYNCED';
                        NEW._hc_err = NULL;
                        RETURN NEW;
                      END IF;
                    END;
                 $$;
CREATE FUNCTION schema.tlog_notify_trigger() RETURNS trigger
    LANGUAGE plpgsql
    AS $$
            DECLARE
             BEGIN
               -- VERSION 1 --
               PERFORM pg_notify('schema.hc_trigger_log', 'ping');
               RETURN new;
             END;
            $$;
CREATE TABLE schema._hcmeta (
    id integer NOT NULL,
    hcver integer,
    org_id character varying(50),
    details text
);
CREATE SEQUENCE schema._hcmeta_id_seq
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;
ALTER SEQUENCE schema._hcmeta_id_seq OWNED BY schema._hcmeta.id;
CREATE TABLE schema._sf_event_log (
    id integer NOT NULL,
    table_name character varying(128),
    action character varying(7),
    synced_at timestamp with time zone DEFAULT now(),
    sf_timestamp timestamp with time zone,
    sfid character varying(20),
    record text,
    processed boolean
);
CREATE SEQUENCE schema._sf_event_log_id_seq
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;
ALTER SEQUENCE schema._sf_event_log_id_seq OWNED BY schema._sf_event_log.id;
CREATE TABLE schema._trigger_log (
    id integer NOT NULL,
    txid bigint,
    created_at timestamp with time zone DEFAULT now(),
    updated_at timestamp with time zone DEFAULT now(),
    processed_at timestamp with time zone,
    processed_tx bigint,
    state character varying(8),
    action character varying(7),
    table_name character varying(128),
    record_id integer,
    sfid character varying(18),
    old text,
    "values" text,
    sf_result integer,
    sf_message text
);
CREATE TABLE schema._trigger_log_archive (
    id integer NOT NULL,
    txid bigint,
    created_at timestamp with time zone,
    updated_at timestamp with time zone,
    processed_at timestamp with time zone,
    processed_tx bigint,
    state character varying(8),
    action character varying(7),
    table_name character varying(128),
    record_id integer,
    sfid character varying(18),
    old text,
    "values" text,
    sf_result integer,
    sf_message text
);
CREATE SEQUENCE schema._trigger_log_id_seq
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;
ALTER SEQUENCE schema._trigger_log_id_seq OWNED BY schema._trigger_log.id;
CREATE TABLE schema.client_contact__c (
    createddate timestamp without time zone,
    isdeleted boolean,
    name character varying(80),
    systemmodstamp timestamp without time zone,
    client__c character varying(18),
    sfid character varying(18),
    id integer NOT NULL,
    _hc_lastop character varying(32),
    _hc_err text
);
CREATE SEQUENCE schema.client_contact__c_id_seq
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;
ALTER SEQUENCE schema.client_contact__c_id_seq OWNED BY schema.client_contact__c.id;
CREATE TABLE schema.contact (
    lastname character varying(80),
    accountid character varying(18),
    name character varying(121),
    birthdate date,
    infrm__referral_date__c date,
    isdeleted boolean,
    systemmodstamp timestamp without time zone,
    client_id__c character varying(30),
    createddate timestamp without time zone,
    firstname character varying(40),
    sfid character varying(18) NOT NULL,
    id integer NOT NULL,
    _hc_lastop character varying(32),
    _hc_err text,
    reportstoid character varying(18),
    email character varying(80)
);
CREATE SEQUENCE schema.contact_id_seq
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;
ALTER SEQUENCE schema.contact_id_seq OWNED BY schema.contact.id;
CREATE TABLE schema.infrm__action__c (
    createddate timestamp without time zone,
    isdeleted boolean,
    name character varying(80),
    systemmodstamp timestamp without time zone,
    sfid character varying(18) NOT NULL,
    id integer NOT NULL,
    _hc_lastop character varying(32),
    _hc_err text,
    recordtypeid character varying(18),
    counsellor__c character varying(255),
    start_date_new__c date,
    complexity_factors__c character varying(4099),
    contextual_problems__c character varying(4099),
    goal_progress__c character varying(255),
    core_score__c double precision,
    core_score_stage__c character varying(255),
    infrm__client__c character varying(18)
);
CREATE SEQUENCE schema.infrm__action__c_id_seq
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;
ALTER SEQUENCE schema.infrm__action__c_id_seq OWNED BY schema.infrm__action__c.id;
CREATE TABLE schema.infrm__supportplan__c (
    infrm__priority_2_action_was_it_done__c character varying(255),
    infrm__priority_area_1_completed_date__c date,
    infrm__x8_meaningful_use_time_staff__c character varying(255),
    infrm__priority_area_2_completed_date__c date,
    infrm__priority_4_action_was_it_done__c character varying(255),
    infrm__priority_area_4__c character varying(255),
    infrm__priority_area_3_completed_date__c date,
    infrm__priority_area_4_completed_date__c date,
    infrm__x6_physical_health_staff__c character varying(255),
    infrm__priority_area_3__c character varying(255),
    infrm__priority_area_2__c character varying(255),
    infrm__priority_area_4_target_date__c date,
    infrm__priority_area_1_who__c character varying(255),
    infrm__priority_area_3_target_date__c date,
    infrm__priority_area_2_target_date__c date,
    infrm__x1_motivation_taking_responsibility_staf__c character varying(255),
    infrm__priority_area_1_target_date__c date,
    infrm__x9_managing_tenancy_accommodation_staff__c character varying(255),
    name character varying(80),
    infrm__x7_emotional_mental_health_staff__c character varying(255),
    infrm__priority_area_2_by_who__c character varying(255),
    infrm__priority_area_3_by_who__c character varying(255),
    infrm__x2_self_care_living_skills_staff__c character varying(255),
    isdeleted boolean,
    infrm__priority_area_4_by_who__c character varying(255),
    systemmodstamp timestamp without time zone,
    infrm__priority_1_was_it_done__c character varying(255),
    infrm__x4_social_networks_relationships_staff__c character varying(255),
    createddate timestamp without time zone,
    sfid character varying(18) NOT NULL,
    id integer NOT NULL,
    _hc_lastop character varying(32),
    _hc_err text,
    infrm__x3_managing_money_staff__c character varying(255),
    infrm__x10_offending_staff__c character varying(255),
    infrm__x5_score5_drug_alcohol_misuse_staff__c character varying(255),
    infrm__priority_area__c character varying(255),
    infrm__pr__c character varying(255),
    infrm__priority_area_1_action__c text,
    infrm__priority_area_2_action__c text,
    infrm__priority_area_3_action__c text,
    infrm__priority_area_4_action__c text,
    not_completed_as5__c boolean,
    to_be_completed_by_as1__c date,
    not_completed_as4__c boolean,
    not_completed_as3__c boolean,
    not_completed_as2__c boolean,
    not_completed_as1__c boolean,
    action_set_as5__c character varying(1000),
    action_set_as4__c character varying(1000),
    action_set_as3__c character varying(1000),
    action_set_as2__c character varying(1000),
    action_set_as1__c character varying(1000),
    no_longer_relevant_as5__c boolean,
    no_longer_relevant_as4__c boolean,
    no_longer_relevant_as3__c boolean,
    no_longer_relevant_as2__c boolean,
    no_longer_relevant_as1__c boolean,
    actual_date_of_completion_as5__c date,
    actual_date_of_completion_as4__c date,
    to_be_completed_by_as5__c date,
    actual_date_of_completion_as3__c date,
    to_be_completed_by_as4__c date,
    actual_date_of_completion_as2__c date,
    to_be_completed_by_as3__c date,
    to_be_completed_by_as2__c date,
    actual_date_of_completion_as1__c date,
    recordtypeid character varying(18),
    infrm__client__c character varying(18),
    mental_health_risks_other_diagnosed__c character varying(255),
    createdbyid character varying(18)
);
CREATE SEQUENCE schema.infrm__supportplan__c_id_seq
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;
ALTER SEQUENCE schema.infrm__supportplan__c_id_seq OWNED BY schema.infrm__supportplan__c.id;
CREATE TABLE schema.recordtype (
    createddate timestamp without time zone,
    name character varying(80),
    systemmodstamp timestamp without time zone,
    sfid character varying(18),
    id integer NOT NULL,
    _hc_lastop character varying(32),
    _hc_err text
);
CREATE SEQUENCE schema.recordtype_id_seq
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;
ALTER SEQUENCE schema.recordtype_id_seq OWNED BY schema.recordtype.id;
CREATE TABLE schema."user" (
    createddate timestamp without time zone,
    name character varying(121),
    systemmodstamp timestamp without time zone,
    sfid character varying(18) NOT NULL,
    id integer NOT NULL,
    _hc_lastop character varying(32),
    _hc_err text
);
CREATE SEQUENCE schema.user_id_seq
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;
ALTER SEQUENCE schema.user_id_seq OWNED BY schema."user".id;
ALTER TABLE ONLY schema._hcmeta ALTER COLUMN id SET DEFAULT nextval('schema._hcmeta_id_seq'::regclass);
ALTER TABLE ONLY schema._sf_event_log ALTER COLUMN id SET DEFAULT nextval('schema._sf_event_log_id_seq'::regclass);
ALTER TABLE ONLY schema._trigger_log ALTER COLUMN id SET DEFAULT nextval('schema._trigger_log_id_seq'::regclass);
ALTER TABLE ONLY schema.client_contact__c ALTER COLUMN id SET DEFAULT nextval('schema.client_contact__c_id_seq'::regclass);
ALTER TABLE ONLY schema.contact ALTER COLUMN id SET DEFAULT nextval('schema.contact_id_seq'::regclass);
ALTER TABLE ONLY schema.infrm__action__c ALTER COLUMN id SET DEFAULT nextval('schema.infrm__action__c_id_seq'::regclass);
ALTER TABLE ONLY schema.infrm__supportplan__c ALTER COLUMN id SET DEFAULT nextval('schema.infrm__supportplan__c_id_seq'::regclass);
ALTER TABLE ONLY schema.recordtype ALTER COLUMN id SET DEFAULT nextval('schema.recordtype_id_seq'::regclass);
ALTER TABLE ONLY schema."user" ALTER COLUMN id SET DEFAULT nextval('schema.user_id_seq'::regclass);
ALTER TABLE ONLY schema._hcmeta
    ADD CONSTRAINT _hcmeta_pkey PRIMARY KEY (id);
ALTER TABLE ONLY schema._sf_event_log
    ADD CONSTRAINT _sf_event_log_pkey PRIMARY KEY (id);
ALTER TABLE ONLY schema._trigger_log_archive
    ADD CONSTRAINT _trigger_log_archive_pkey PRIMARY KEY (id);
ALTER TABLE ONLY schema._trigger_log
    ADD CONSTRAINT _trigger_log_pkey PRIMARY KEY (id);
ALTER TABLE ONLY schema.client_contact__c
    ADD CONSTRAINT client_contact__c_pkey PRIMARY KEY (id);
ALTER TABLE ONLY schema.contact
    ADD CONSTRAINT contact_pkey PRIMARY KEY (id, sfid);
ALTER TABLE ONLY schema.infrm__action__c
    ADD CONSTRAINT infrm__action__c_pkey PRIMARY KEY (id, sfid);
ALTER TABLE ONLY schema.infrm__supportplan__c
    ADD CONSTRAINT infrm__supportplan__c_pkey PRIMARY KEY (id, sfid);
ALTER TABLE ONLY schema.infrm__supportplan__c
    ADD CONSTRAINT infrm__supportplan__c_sfid_id_key UNIQUE (sfid, id);
ALTER TABLE ONLY schema.recordtype
    ADD CONSTRAINT recordtype_pkey PRIMARY KEY (id);
ALTER TABLE ONLY schema.recordtype
    ADD CONSTRAINT recordtype_sfid_key UNIQUE (sfid);
ALTER TABLE ONLY schema."user"
    ADD CONSTRAINT user_pkey PRIMARY KEY (id, sfid);
ALTER TABLE ONLY schema."user"
    ADD CONSTRAINT user_sfid_id_key UNIQUE (sfid, id);
CREATE INDEX _trigger_log_archive_idx_created_at ON schema._trigger_log_archive USING btree (created_at);
CREATE INDEX _trigger_log_archive_idx_record_id ON schema._trigger_log_archive USING btree (record_id);
CREATE INDEX _trigger_log_archive_idx_state_table_name ON schema._trigger_log_archive USING btree (state, table_name) WHERE ((state)::text = 'FAILED'::text);
CREATE INDEX _trigger_log_idx_created_at ON schema._trigger_log USING btree (created_at);
CREATE INDEX _trigger_log_idx_state_id ON schema._trigger_log USING btree (state, id);
CREATE INDEX _trigger_log_idx_state_table_name ON schema._trigger_log USING btree (state, table_name) WHERE (((state)::text = 'NEW'::text) OR ((state)::text = 'PENDING'::text));
CREATE INDEX hc_idx_client_contact__c_systemmodstamp ON schema.client_contact__c USING btree (systemmodstamp);
CREATE INDEX hc_idx_contact_systemmodstamp ON schema.contact USING btree (systemmodstamp);
CREATE INDEX hc_idx_infrm__action__c_systemmodstamp ON schema.infrm__action__c USING btree (systemmodstamp);
CREATE INDEX hc_idx_infrm__supportplan__c_infrm__client__c ON schema.infrm__supportplan__c USING btree (infrm__client__c);
CREATE INDEX hc_idx_infrm__supportplan__c_systemmodstamp ON schema.infrm__supportplan__c USING btree (systemmodstamp);
CREATE INDEX hc_idx_recordtype_systemmodstamp ON schema.recordtype USING btree (systemmodstamp);
CREATE INDEX hc_idx_user_systemmodstamp ON schema."user" USING btree (systemmodstamp);
CREATE UNIQUE INDEX hcu_idx_client_contact__c_sfid ON schema.client_contact__c USING btree (sfid);
CREATE UNIQUE INDEX hcu_idx_contact_sfid ON schema.contact USING btree (sfid);
CREATE UNIQUE INDEX hcu_idx_infrm__action__c_sfid ON schema.infrm__action__c USING btree (sfid);
CREATE UNIQUE INDEX hcu_idx_infrm__supportplan__c_sfid ON schema.infrm__supportplan__c USING btree (sfid);
CREATE UNIQUE INDEX hcu_idx_recordtype_sfid ON schema.recordtype USING btree (sfid);
CREATE UNIQUE INDEX hcu_idx_user_sfid ON schema."user" USING btree (sfid);
CREATE INDEX idx__sf_event_log_comp_key ON schema._sf_event_log USING btree (table_name, synced_at);
CREATE INDEX idx__sf_event_log_sfid ON schema._sf_event_log USING btree (sfid);
CREATE TRIGGER hc_client_contact__c_logtrigger AFTER INSERT OR DELETE OR UPDATE ON schema.client_contact__c FOR EACH ROW WHEN (((public.get_xmlbinary())::text = 'base64'::text)) EXECUTE FUNCTION schema.hc_client_contact__c_logger();
CREATE TRIGGER hc_client_contact__c_status_trigger BEFORE INSERT OR UPDATE ON schema.client_contact__c FOR EACH ROW EXECUTE FUNCTION schema.hc_client_contact__c_status();
CREATE TRIGGER hc_contact_logtrigger AFTER INSERT OR DELETE OR UPDATE ON schema.contact FOR EACH ROW WHEN (((public.get_xmlbinary())::text = 'base64'::text)) EXECUTE FUNCTION schema.hc_contact_logger();
CREATE TRIGGER hc_contact_status_trigger BEFORE INSERT OR UPDATE ON schema.contact FOR EACH ROW EXECUTE FUNCTION schema.hc_contact_status();
CREATE TRIGGER hc_infrm__action__c_logtrigger AFTER INSERT OR DELETE OR UPDATE ON schema.infrm__action__c FOR EACH ROW WHEN (((public.get_xmlbinary())::text = 'base64'::text)) EXECUTE FUNCTION schema.hc_infrm__action__c_logger();
CREATE TRIGGER hc_infrm__action__c_status_trigger BEFORE INSERT OR UPDATE ON schema.infrm__action__c FOR EACH ROW EXECUTE FUNCTION schema.hc_infrm__action__c_status();
CREATE TRIGGER hc_infrm__supportplan__c_logtrigger AFTER INSERT OR DELETE OR UPDATE ON schema.infrm__supportplan__c FOR EACH ROW WHEN (((public.get_xmlbinary())::text = 'base64'::text)) EXECUTE FUNCTION schema.hc_infrm__supportplan__c_logger();
CREATE TRIGGER hc_infrm__supportplan__c_status_trigger BEFORE INSERT OR UPDATE ON schema.infrm__supportplan__c FOR EACH ROW EXECUTE FUNCTION schema.hc_infrm__supportplan__c_status();
CREATE TRIGGER hc_recordtype_logtrigger AFTER INSERT OR DELETE OR UPDATE ON schema.recordtype FOR EACH ROW WHEN (((public.get_xmlbinary())::text = 'base64'::text)) EXECUTE FUNCTION schema.hc_recordtype_logger();
CREATE TRIGGER hc_recordtype_status_trigger BEFORE INSERT OR UPDATE ON schema.recordtype FOR EACH ROW EXECUTE FUNCTION schema.hc_recordtype_status();
CREATE TRIGGER hc_user_logtrigger AFTER INSERT OR DELETE OR UPDATE ON schema."user" FOR EACH ROW WHEN (((public.get_xmlbinary())::text = 'base64'::text)) EXECUTE FUNCTION schema.hc_user_logger();
CREATE TRIGGER hc_user_status_trigger BEFORE INSERT OR UPDATE ON schema."user" FOR EACH ROW EXECUTE FUNCTION schema.hc_user_status();
CREATE TRIGGER tlog_insert_trigger AFTER INSERT ON schema._trigger_log FOR EACH ROW EXECUTE FUNCTION schema.tlog_notify_trigger();
ALTER TABLE ONLY schema.infrm__action__c
    ADD CONSTRAINT infrm__action__c_infrm__client__c_fkey FOREIGN KEY (infrm__client__c) REFERENCES schema.contact(sfid) ON UPDATE RESTRICT ON DELETE RESTRICT;
ALTER TABLE ONLY schema.infrm__action__c
    ADD CONSTRAINT infrm__action__c_recordtypeid_fkey FOREIGN KEY (recordtypeid) REFERENCES schema.recordtype(sfid) ON UPDATE RESTRICT ON DELETE RESTRICT;
ALTER TABLE ONLY schema.infrm__supportplan__c
    ADD CONSTRAINT infrm__supportplan__c_createdbyid_fkey FOREIGN KEY (createdbyid) REFERENCES schema."user"(sfid) ON UPDATE RESTRICT ON DELETE RESTRICT;
ALTER TABLE ONLY schema.infrm__supportplan__c
    ADD CONSTRAINT infrm__supportplan__c_infrm__client__c_fkey FOREIGN KEY (infrm__client__c) REFERENCES schema.contact(sfid) ON UPDATE RESTRICT ON DELETE RESTRICT;
ALTER TABLE ONLY schema.infrm__supportplan__c
    ADD CONSTRAINT infrm__supportplan__c_recordtypeid_fkey FOREIGN KEY (recordtypeid) REFERENCES schema.recordtype(sfid) ON UPDATE RESTRICT ON DELETE RESTRICT;
