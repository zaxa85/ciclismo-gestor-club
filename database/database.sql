CREATE OR REPLACE VIEW public.v_payment_control WITH (security_barrier=false) AS 
 SELECT payment.id,
    payment.firstname,
    payment.lastname,
    payment.datestart,
    payment.period,
    COALESCE(payment.jan, '#'::text) AS jan,
    COALESCE(payment.feb, '#'::text) AS feb,
    COALESCE(payment.mar, '#'::text) AS mar,
    COALESCE(payment.apr, '#'::text) AS apr,
    COALESCE(payment.may, '#'::text) AS may,
    COALESCE(payment.jun, '#'::text) AS jun,
    COALESCE(payment.jul, '#'::text) AS jul,
    COALESCE(payment.aug, '#'::text) AS aug,
    COALESCE(payment.sep, '#'::text) AS sep,
    COALESCE(payment.oct, '#'::text) AS oct,
    COALESCE(payment.nov, '#'::text) AS nov,
    COALESCE(payment."dec", '#'::text) AS "dec"
   FROM crosstab('SELECT CONCAT(payment.id_fk_member_id, ''#'' , period.name) as id, member.firstname as firstname, member.lastname as lastname, datestart, period.name as period, month, 
   CONCAT(payment.id, ''#'' , amount::text, ''#'' , dateperform::text, ''#'' , payment.status ) as amount
   FROM payment, member, period 
   WHERE member.id = payment.id_fk_member_id and period.id = payment.id_fk_period_id order by 1'::text, 'SELECT generate_series(1,12)'::text) 
   payment(id character varying, firstname character varying, lastname character varying, datestart date, period character varying, 
   jan text, feb text, mar text, apr text, may text, jun text, jul text, aug text, sep text, oct text, nov text, "dec" text);


drop view v_payment_control

ALTER TABLE public.v_payment_control
  OWNER TO postgres;


SELECT member.id as id, member.firstname as firstname, member.lastname as lastname, datestart, period.name as period, month, 
   CONCAT(payment.id, ''#'' , amount::text, ''#'' , dateperform::text) as amount
   FROM payment, member, period 
   WHERE member.id = payment.id_fk_member_id and period.id = payment.id_fk_period_i



 SELECT 
 payment.index,
    payment.id_fk_member_id,
    payment.firstname,
    payment.lastname,
    payment.datestart,
    payment.period,
    COALESCE(payment.jan, '#'::text) AS jan,
    COALESCE(payment.feb, '#'::text) AS feb,
    COALESCE(payment.mar, '#'::text) AS mar,
    COALESCE(payment.apr, '#'::text) AS apr,
    COALESCE(payment.may, '#'::text) AS may,
    COALESCE(payment.jun, '#'::text) AS jun,
    COALESCE(payment.jul, '#'::text) AS jul,
    COALESCE(payment.aug, '#'::text) AS aug,
    COALESCE(payment.sep, '#'::text) AS sep,
    COALESCE(payment.oct, '#'::text) AS oct,
    COALESCE(payment.nov, '#'::text) AS nov,
    COALESCE(payment."dec", '#'::text) AS "dec"
   FROM crosstab('SELECT    CONCAT(period.name , ''#'', month::text) as index, payment.id_fk_member_id, member.firstname as firstname, member.lastname as lastname, datestart, period.name as period, month, 
   CONCAT(payment.id, ''#'' , amount::text, ''#'' , dateperform::text) as amount
   FROM payment, member, period 
   WHERE member.id = payment.id_fk_member_id and period.id = payment.id_fk_period_id'::text, 'SELECT generate_series(1,12)'::text) 
   payment(index character varying, id_fk_member_id integer, firstname character varying, lastname character varying, datestart date, period character varying, 
   jan text, feb text, mar text, apr text, may text, jun text, jul text, aug text, sep text, oct text, nov text, "dec" text);








 SELECT payment.id,
    payment.firstname,
    payment.lastname,
    payment.datestart,




select * from v_payment_balance



CREATE OR REPLACE VIEW public.v_payment_balance WITH (security_barrier=false) AS 
 SELECT 
    payment.period,
    COALESCE(payment.jan, '#'::text) AS jan,
    COALESCE(payment.feb, '#'::text) AS feb,
    COALESCE(payment.mar, '#'::text) AS mar,
    COALESCE(payment.apr, '#'::text) AS apr,
    COALESCE(payment.may, '#'::text) AS may,
    COALESCE(payment.jun, '#'::text) AS jun,
    COALESCE(payment.jul, '#'::text) AS jul,
    COALESCE(payment.aug, '#'::text) AS aug,
    COALESCE(payment.sep, '#'::text) AS sep,
    COALESCE(payment.oct, '#'::text) AS oct,
    COALESCE(payment.nov, '#'::text) AS nov,
    COALESCE(payment."dec", '#'::text) AS "dec"
   FROM crosstab('SELECT member.id as id, member.firstname as firstname, member.lastname as lastname, datestart, period.name as period, month, 
   CONCAT(payment.id, ''#'' , amount::text, ''#'' , dateperform::text) as amount
   FROM payment, member, period 
   WHERE member.id = payment.id_fk_member_id and period.id = payment.id_fk_period_id'::text, 'SELECT generate_series(1,12)'::text) 
   payment(id integer, firstname character varying, lastname character varying, datestart date, period character varying, 
   jan text, feb text, mar text, apr text, may text, jun text, jul text, aug text, sep text, oct text, nov text, "dec" text);







 SELECT payment.id,
    payment.firstname,
    payment.lastname,
    payment.datestart,
    payment.period,
    COALESCE(payment.jan, '#'::text) AS jan,
    COALESCE(payment.feb, '#'::text) AS feb,
    COALESCE(payment.mar, '#'::text) AS mar,
    COALESCE(payment.apr, '#'::text) AS apr,
    COALESCE(payment.may, '#'::text) AS may,
    COALESCE(payment.jun, '#'::text) AS jun,
    COALESCE(payment.jul, '#'::text) AS jul,
    COALESCE(payment.aug, '#'::text) AS aug,
    COALESCE(payment.sep, '#'::text) AS sep,
    COALESCE(payment.oct, '#'::text) AS oct,
    COALESCE(payment.nov, '#'::text) AS nov,
    COALESCE(payment."dec", '#'::text) AS "dec"
   FROM crosstab('SELECT payment.id as id, member.firstname as firstname, member.lastname as lastname, datestart, period.name as period, month, 
   CONCAT(payment.id, ''#'' , amount::text, ''#'' , dateperform::text) as amount
   FROM payment, member, period 
   WHERE member.id = payment.id_fk_member_id and period.id = payment.id_fk_period_id'::text, 'SELECT generate_series(1,12)'::text) 
   payment(id integer, firstname character varying, lastname character varying, datestart date, period character varying, 
   jan text, feb text, mar text, apr text, may text, jun text, jul text, aug text, sep text, oct text, nov text, "dec" text);

SELECT period.name as period, month, 
SUM( amount)
   FROM payment, member, period 
   WHERE member.id = payment.id_fk_member_id and period.id = payment.id_fk_period_id 
	and payment.status = 2
   group by period, month order by 1



   


 SELECT payment.id,
    payment.firstname,
    payment.lastname,
    payment.datestart,
    payment.period,
    COALESCE(payment.jan, '#'::text) AS jan,
    COALESCE(payment.feb, '#'::text) AS feb,
    COALESCE(payment.mar, '#'::text) AS mar,
    COALESCE(payment.apr, '#'::text) AS apr,
    COALESCE(payment.may, '#'::text) AS may,
    COALESCE(payment.jun, '#'::text) AS jun,
    COALESCE(payment.jul, '#'::text) AS jul,
    COALESCE(payment.aug, '#'::text) AS aug,
    COALESCE(payment.sep, '#'::text) AS sep,
    COALESCE(payment.oct, '#'::text) AS oct,
    COALESCE(payment.nov, '#'::text) AS nov,
    COALESCE(payment."dec", '#'::text) AS "dec"
   FROM crosstab('SELECT payment.id as id, member.firstname as firstname, member.lastname as lastname, datestart, period.name as period, month, 
   CONCAT(payment.id, ''#'' , amount::text, ''#'' , dateperform::text) as amount
   FROM payment, member, period 
   WHERE member.id = payment.id_fk_member_id and period.id = payment.id_fk_period_id order by 1'::text, 'SELECT generate_series(1,12)'::text) 
   payment(id integer, firstname character varying, lastname character varying, datestart date, period character varying, 
   jan text, feb text, mar text, apr text, may text, jun text, jul text, aug text, sep text, oct text, nov text, "dec" text);








 SELECT payment.id,
    payment.firstname,
    payment.lastname,
    payment.datestart,
    payment.period,
    COALESCE(payment.jan, '#'::text) AS jan,
    COALESCE(payment.feb, '#'::text) AS feb,
    COALESCE(payment.mar, '#'::text) AS mar,
    COALESCE(payment.apr, '#'::text) AS apr,
    COALESCE(payment.may, '#'::text) AS may,
    COALESCE(payment.jun, '#'::text) AS jun,
    COALESCE(payment.jul, '#'::text) AS jul,
    COALESCE(payment.aug, '#'::text) AS aug,
    COALESCE(payment.sep, '#'::text) AS sep,
    COALESCE(payment.oct, '#'::text) AS oct,
    COALESCE(payment.nov, '#'::text) AS nov,
    COALESCE(payment."dec", '#'::text) AS "dec"
   FROM crosstab('SELECT CONCAT(payment.id_fk_member_id, ''#'' , period.name) as id, member.firstname as firstname, member.lastname as lastname, datestart, period.name as period, month, 
   CONCAT(payment.id, ''#'' , amount::text, ''#'' , dateperform::text) as amount
   FROM payment, member, period 
   WHERE member.id = payment.id_fk_member_id and period.id = payment.id_fk_period_id order by 1'::text, 'SELECT generate_series(1,12)'::text) 
   payment(id character varying, firstname character varying, lastname character varying, datestart date, period character varying, 
   jan text, feb text, mar text, apr text, may text, jun text, jul text, aug text, sep text, oct text, nov text, "dec" text);




   select * from income where id_fk_period_id = 2016
   
   select * from expenditure







CREATE OR REPLACE VIEW public.v_payment_balance WITH (security_barrier=false) AS 
 SELECT payment.period as id,
    payment.jan AS jan,    payment.feb AS feb,    payment.mar AS mar,    payment.apr AS apr,
    payment.may AS may,    payment.jun AS jun,    payment.jul AS jul,    payment.aug AS aug,
    payment.sep AS sep,    payment.oct AS oct,    payment.nov AS nov,    payment."dec" AS "dec"
,(COALESCE(payment.jan,'0') ::numeric 
+COALESCE(payment.feb,'0') ::numeric 
+COALESCE(payment.mar,'0') ::numeric 
+COALESCE(payment.apr,'0') ::numeric 
+COALESCE(payment.may,'0') ::numeric
+COALESCE(payment.jun,'0') ::numeric 
+COALESCE(payment.jul,'0') ::numeric 
+COALESCE(payment.aug,'0') ::numeric 
+COALESCE(payment.sep,'0') ::numeric 
+COALESCE(payment.oct,'0') ::numeric 
+COALESCE(payment.nov,'0') ::numeric  
+COALESCE(payment.dec,'0') ::numeric ) as total

   FROM crosstab('SELECT period.name as period, month, 
SUM( amount)
   FROM payment, member, period 
   WHERE member.id = payment.id_fk_member_id and period.id = payment.id_fk_period_id 
	and payment.status = 2
   group by period, month order by 1
'::text, 'SELECT generate_series(1,12)'::text) payment(period character varying, jan text, feb text, mar text, apr text, may text, jun text, jul text, aug text, sep text, oct text, nov text, "dec" text);



drop view v_payment_balance