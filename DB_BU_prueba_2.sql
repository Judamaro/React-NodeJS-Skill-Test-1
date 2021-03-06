PGDMP             	        
    x            DB_Prueba_Decondux    13.0    13.0     ?           0    0    ENCODING    ENCODING        SET client_encoding = 'UTF8';
                      false            ?           0    0 
   STDSTRINGS 
   STDSTRINGS     (   SET standard_conforming_strings = 'on';
                      false            ?           0    0 
   SEARCHPATH 
   SEARCHPATH     8   SELECT pg_catalog.set_config('search_path', '', false);
                      false            ?           1262    16394    DB_Prueba_Decondux    DATABASE     s   CREATE DATABASE "DB_Prueba_Decondux" WITH TEMPLATE = template0 ENCODING = 'UTF8' LOCALE = 'Spanish_Colombia.1252';
 $   DROP DATABASE "DB_Prueba_Decondux";
                postgres    false            ?           0    0    DATABASE "DB_Prueba_Decondux"    COMMENT     D   COMMENT ON DATABASE "DB_Prueba_Decondux" IS 'Database app pruebax';
                   postgres    false    3033            ?            1259    16480    accion    TABLE     m   CREATE TABLE public.accion (
    id_accion integer NOT NULL,
    nombre_accion character varying NOT NULL
);
    DROP TABLE public.accion;
       public         heap    postgres    false            ?            1259    16400    categoria_empleado    TABLE        CREATE TABLE public.categoria_empleado (
    id_categoria integer NOT NULL,
    nombre_categoria character varying NOT NULL
);
 &   DROP TABLE public.categoria_empleado;
       public         heap    postgres    false            ?            1259    16395    empleado    TABLE     ?  CREATE TABLE public.empleado (
    nombre_empleado character varying(60) NOT NULL,
    apellido_empleado character varying(60) NOT NULL,
    cc_empleado integer NOT NULL,
    telefono_empleado character varying(60) NOT NULL,
    salario_empleado integer NOT NULL,
    email_empleado character varying(60) NOT NULL,
    nombre_empresa character varying(60) NOT NULL,
    id_categoria_fk integer NOT NULL
);
    DROP TABLE public.empleado;
       public         heap    postgres    false            ?            1259    16475 
   rol_accion    TABLE     ?   CREATE TABLE public.rol_accion (
    id_rol integer NOT NULL,
    rol_usuario_fk integer NOT NULL,
    accion_fk integer NOT NULL
);
    DROP TABLE public.rol_accion;
       public         heap    postgres    false            ?            1259    16467    rol_usuario    TABLE     l   CREATE TABLE public.rol_usuario (
    id_rol integer NOT NULL,
    nombre_rol character varying NOT NULL
);
    DROP TABLE public.rol_usuario;
       public         heap    postgres    false            ?            1259    16505    usuario    TABLE     2  CREATE TABLE public.usuario (
    id_usuario integer NOT NULL,
    nombre_u character varying NOT NULL,
    usuario_u character varying NOT NULL,
    contrasena_u character varying NOT NULL,
    id_rol_usuario_fk integer NOT NULL,
    imagen_u character varying NOT NULL,
    session_u boolean NOT NULL
);
    DROP TABLE public.usuario;
       public         heap    postgres    false            ?            1259    16503    usuario_id_usuario_seq    SEQUENCE     ?   CREATE SEQUENCE public.usuario_id_usuario_seq
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;
 -   DROP SEQUENCE public.usuario_id_usuario_seq;
       public          postgres    false    206            ?           0    0    usuario_id_usuario_seq    SEQUENCE OWNED BY     Q   ALTER SEQUENCE public.usuario_id_usuario_seq OWNED BY public.usuario.id_usuario;
          public          postgres    false    205            :           2604    16508    usuario id_usuario    DEFAULT     x   ALTER TABLE ONLY public.usuario ALTER COLUMN id_usuario SET DEFAULT nextval('public.usuario_id_usuario_seq'::regclass);
 A   ALTER TABLE public.usuario ALTER COLUMN id_usuario DROP DEFAULT;
       public          postgres    false    206    205    206            ?          0    16480    accion 
   TABLE DATA           :   COPY public.accion (id_accion, nombre_accion) FROM stdin;
    public          postgres    false    204   ?$       ?          0    16400    categoria_empleado 
   TABLE DATA           L   COPY public.categoria_empleado (id_categoria, nombre_categoria) FROM stdin;
    public          postgres    false    201   %       ?          0    16395    empleado 
   TABLE DATA           ?   COPY public.empleado (nombre_empleado, apellido_empleado, cc_empleado, telefono_empleado, salario_empleado, email_empleado, nombre_empresa, id_categoria_fk) FROM stdin;
    public          postgres    false    200   D%       ?          0    16475 
   rol_accion 
   TABLE DATA           G   COPY public.rol_accion (id_rol, rol_usuario_fk, accion_fk) FROM stdin;
    public          postgres    false    203   ?%       ?          0    16467    rol_usuario 
   TABLE DATA           9   COPY public.rol_usuario (id_rol, nombre_rol) FROM stdin;
    public          postgres    false    202   &       ?          0    16505    usuario 
   TABLE DATA           x   COPY public.usuario (id_usuario, nombre_u, usuario_u, contrasena_u, id_rol_usuario_fk, imagen_u, session_u) FROM stdin;
    public          postgres    false    206   K&       ?           0    0    usuario_id_usuario_seq    SEQUENCE SET     D   SELECT pg_catalog.setval('public.usuario_id_usuario_seq', 5, true);
          public          postgres    false    205            >           2606    16407 *   categoria_empleado Categoria_Empleado_pkey 
   CONSTRAINT     t   ALTER TABLE ONLY public.categoria_empleado
    ADD CONSTRAINT "Categoria_Empleado_pkey" PRIMARY KEY (id_categoria);
 V   ALTER TABLE ONLY public.categoria_empleado DROP CONSTRAINT "Categoria_Empleado_pkey";
       public            postgres    false    201            <           2606    16399    empleado Empleado_pkey 
   CONSTRAINT     _   ALTER TABLE ONLY public.empleado
    ADD CONSTRAINT "Empleado_pkey" PRIMARY KEY (cc_empleado);
 B   ALTER TABLE ONLY public.empleado DROP CONSTRAINT "Empleado_pkey";
       public            postgres    false    200            D           2606    16487    accion accion_pkey 
   CONSTRAINT     W   ALTER TABLE ONLY public.accion
    ADD CONSTRAINT accion_pkey PRIMARY KEY (id_accion);
 <   ALTER TABLE ONLY public.accion DROP CONSTRAINT accion_pkey;
       public            postgres    false    204            B           2606    16479    rol_accion rol_accion_pkey 
   CONSTRAINT     \   ALTER TABLE ONLY public.rol_accion
    ADD CONSTRAINT rol_accion_pkey PRIMARY KEY (id_rol);
 D   ALTER TABLE ONLY public.rol_accion DROP CONSTRAINT rol_accion_pkey;
       public            postgres    false    203            @           2606    16474    rol_usuario rol_usuario_pkey 
   CONSTRAINT     ^   ALTER TABLE ONLY public.rol_usuario
    ADD CONSTRAINT rol_usuario_pkey PRIMARY KEY (id_rol);
 F   ALTER TABLE ONLY public.rol_usuario DROP CONSTRAINT rol_usuario_pkey;
       public            postgres    false    202            F           2606    16513    usuario usuario_pkey 
   CONSTRAINT     Z   ALTER TABLE ONLY public.usuario
    ADD CONSTRAINT usuario_pkey PRIMARY KEY (id_usuario);
 >   ALTER TABLE ONLY public.usuario DROP CONSTRAINT usuario_pkey;
       public            postgres    false    206            G           2606    16454    empleado FK_Categ    FK CONSTRAINT     ?   ALTER TABLE ONLY public.empleado
    ADD CONSTRAINT "FK_Categ" FOREIGN KEY (id_categoria_fk) REFERENCES public.categoria_empleado(id_categoria) ON UPDATE RESTRICT ON DELETE RESTRICT NOT VALID;
 =   ALTER TABLE ONLY public.empleado DROP CONSTRAINT "FK_Categ";
       public          postgres    false    2878    201    200            I           2606    16498    rol_accion fk_accion    FK CONSTRAINT     ?   ALTER TABLE ONLY public.rol_accion
    ADD CONSTRAINT fk_accion FOREIGN KEY (accion_fk) REFERENCES public.accion(id_accion) ON UPDATE RESTRICT ON DELETE RESTRICT NOT VALID;
 >   ALTER TABLE ONLY public.rol_accion DROP CONSTRAINT fk_accion;
       public          postgres    false    203    204    2884            H           2606    16493    rol_accion fk_rol_usuario    FK CONSTRAINT     ?   ALTER TABLE ONLY public.rol_accion
    ADD CONSTRAINT fk_rol_usuario FOREIGN KEY (rol_usuario_fk) REFERENCES public.rol_usuario(id_rol) ON UPDATE RESTRICT ON DELETE RESTRICT NOT VALID;
 C   ALTER TABLE ONLY public.rol_accion DROP CONSTRAINT fk_rol_usuario;
       public          postgres    false    2880    202    203            J           2606    16514    usuario fk_rol_usuario    FK CONSTRAINT     ?   ALTER TABLE ONLY public.usuario
    ADD CONSTRAINT fk_rol_usuario FOREIGN KEY (id_rol_usuario_fk) REFERENCES public.rol_usuario(id_rol) ON UPDATE RESTRICT ON DELETE RESTRICT NOT VALID;
 @   ALTER TABLE ONLY public.usuario DROP CONSTRAINT fk_rol_usuario;
       public          postgres    false    202    206    2880            ?      x?????? ? ?      ?   &   x?3?t*??KN?2??/??2??I,????????? ?|?      ?   ?   x??̽
?0@???)?%?7?:\:?\?R"??@@}z-u?g>|}???h???t?e?fȡĹNw??V
????K?_??JT??Ü(^?1'??1/?^A??i???h%(t???Ѡ?j?Ҧ??KSl?#???@i?Gk?>??[??$Ֆĝ?ޒ?O??2?(??      ?      x?????? ? ?      ?   &   x?3?tL????,.)JL?/?2?tJ,?L??????? ???      ?   ?   x??O?
?0<o??_?6Q???DA??BX?4DmSR??[k????3????R???????h???}8O@?rE?Ե??H
?a??
??`Kw?4???ϩ$g????xk?xh?k^Ó31U??jkďq??Te???qA?YU?????}Dl\?hJҪu[oWR?"??b"???a2N????pe?k}M8???\t???T?0d?=1Ƃ      