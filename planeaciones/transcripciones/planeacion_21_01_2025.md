Resumen

### Problemas Identificados en el Formulario de Cotización

- En la versión móvil, no aparece la opción para borrar imágenes de referencia cuando se suben desde el celular
- Los tamaños en las cotizaciones actualmente muestran "pequeño, mediano, grande" pero deberían mostrar las medidas en centímetros para mayor claridad
- La información del tamaño aparece muy pequeña en la vista de cotizaciones

### Rediseño del Sistema de Locaciones

- Se decidió simplificar la selección de ubicación usando un único campo de búsqueda dinámica, similar a Google Maps o Kayak
- El nuevo sistema mostrará ciudad y país/departamento en un solo campo (ej: "Cali, Colombia" o "La Unión, Nariño")
- Esta misma funcionalidad se implementará en el perfil del tatuador para que preseleccione las ciudades donde trabaja
- Las ciudades preseleccionadas por el tatuador aparecerán como opciones en el formulario para clientes 

### Reorganización del Flujo del Formulario

- Se acordó mover la información de contacto al final del formulario en lugar de al inicio
- La razón es que empezar con datos personales genera fricción, mientras que comenzar con opciones visuales es más atractivo
- El nuevo orden será: ubicación y estilo primero, luego selección de tatuador, y finalmente datos de contacto

### Filtros de Búsqueda de Tatuadores

- La ubicación y el estilo serán los dos primeros filtros en la búsqueda
- Estos dos criterios son fundamentales porque determinan qué tatuadores pueden realizar el trabajo
- La búsqueda filtrará tatuadores según la ciudad seleccionada y el estilo de tatuaje

### Diseño de Tarjetas de Tatuadores

- Se decidió usar la opción 2 (modal) para mostrar información detallada de los tatuadores
- Las tarjetas mostrarán miniaturas de tatuajes filtradas por el estilo que el cliente seleccionó
- Se agregará un botón (lupita o similar) para ver más detalles que abrirá una vista completa del perfil
- El diseño debe priorizarse para mobile, donde las imágenes deben ser lo suficientemente grandes para apreciarse

### Banner de Marketing

- Se revisó un mockup para la imagen promocional de Facebook
- Se decidió usar una estructura que muestre el problema y la solución que ofrece la aplicación
- Se discutió qué contenido mostrar en el teléfono del banner, considerando el landing actual de [liebre.inc](http://liebre.inc)

### Configuración de Disponibilidad

- Se cambiará el dropdown de disponibilidad por tres botones independientes
- Las opciones serán: "Pronto", "De 1 a 2 semanas", y "De 2 semanas a un mes o más"

### Sistema de Calendario y Agendamiento

- Se discutió extensamente cómo integrar el calendario en el flujo de cotización
- Inicialmente se planteó como una reunión de kick-off entre tatuador y cliente
- Se identificó el riesgo de que clientes agenden asesorías gratuitas y no asistan (80% de inasistencia)
- Se propuso enviar recordatorios automáticos para confirmar asistencia

#### Decisión Final sobre el Calendario

- El calendario se quitará de la vista de confirmación de cotización
- El tatuador compartirá un enlace al calendario solo después de aprobar la cotización
- Esto permite al tatuador controlar quién puede acceder a su agenda
- El tatuador podrá elegir el tipo de evento: asesoría corta o sesión de tatuaje completa

### Gestión del Calendario por el Tatuador

- Los tatuadores necesitan control sobre su agenda porque manejan múltiples proyectos como un Tetris
- Aproximadamente 20-25% de los tatuadores tienen agendas muy ocupadas que requieren gestión detallada
- Se propuso permitir que cada tatuador active o desactive la opción de agendamiento automático según su preferencia
- Se planea agregar configuración de días laborables y rangos horarios por día

### Próximos Pasos

- El equipo se tomará un descanso de 10 minutos antes de priorizar todas las tareas identificadas

### Action Items

- [ ]  Cami: Corregir funcionalidad de borrado de imágenes en formulario móvil
- [ ]  Cami: Implementar sistema de búsqueda de ubicación estilo Google Maps/Kayak
- [ ]  Cami: Reorganizar flujo del formulario moviendo contacto al final
- [ ]  Cami: Implementar filtros de ubicación y estilo al inicio de la búsqueda
- [ ]  Cami: Diseñar e implementar modal de tatuadores con miniaturas filtradas por estilo
- [ ]  Cami: Actualizar banner de Facebook con correcciones de íconos y logo
- [ ]  Dani: Cambiar display de tamaños a centímetros en resumen de cotizaciones
- [ ]  Cami: Convertir dropdown de disponibilidad en tres botones independientes
- [ ]  Dani: Implementar funcionalidad de compartir calendario por enlace
- [ ]  Cami: Crear mockups para gestión de calendario y configuración de horarios
- [ ]  Equipo: Sesión de priorización de tareas pendientes

Notas

Transcripción

De cuáles imágenes? En la cotización, cuando se suben las imágenes de referencia desde el celular, no me da la opción para para borrarlas. Ah, ¿no sale la X? A mí no me salió. Ah, sí, es cierto. No, ahí no sale.

También recuerda lo que habíamos hablado de las locaciones, si de repente esperamos activar lo que teníamos antes y dejarle una casilla. para poner una nueva locación si es necesario.

Si ese camión no alcanza a montarlo...

de ahi, entonces si quieres devuélvete un pasito Kami

porque igual yo siento que o bueno ustedes que opinan del mocap que les envía ayer ayer antes

Está bien, que salen como las opciones y abajo como el de agregar otra más. Ajá. No lo alcanzamos. Y... ¿Dónde vamos a empezar?

¡Gracias! Al lunes. ¿El lunes? Sí. Es el hoy.

Dejamos... dejamos los mismos lugares estos que teníamos.

Sí, o si pudiéramos de repente poner esa misma opción que sale ahora mismo para alguien que se está llenando el formulario para el tatuador. para que él lo pueda poner en su perfil no sé no sé cómo sería de repente cuando no está poniendo sus imágenes y todo en el perfil de

de uno como tatuador y hay un apartado donde uno puede seleccionar esas ciudades en donde uno tatúa constantemente. y que uno las pueda preseleccionar, y cuando ya lo mande al formulario, bueno a los clientes cuando los mande al formulario, que salgan esas opciones que él seleccionó.

¿En qué? En Kayak ¿Qué es Kayak? Kayak es para buscar tiquetes Ah, la página...

Entonces ponle por ejemplo ahí destino, parate en destino, o borrale el pogotaro.

Es darle ahí valle, por ejemplo.

Entonces como que hay como que dependiendo, ponle cali

como que de alguna forma como que atarlo como a la ciudad y el país y ya se me entiende o sea no meter uno pues no meterle departamentos y dos pues que sea una búsqueda que vos puedas buscar ponle Colombia ahí

Entonces, como que, simplemente sea una búsqueda por ciudad, ¿cierto?, y pues que te llegue a Cali, pero Cali-Colombia, o Cali-Colombia, o Cali-Colombia, o Cali-Colombia, o Cali-Colombia.

la unión nariño o la unión antioquia si me entiendes? osea como que dejar solo un campo y que pues el te de como las opciones con el

¡Gracias por ver el video y por suscribirse al canal!

Ajá, entonces mira aquí la unión Nariño, la unión Valle del Cauca o la unión Antioquia. ¿Sí pillas? O la unión El Cerrito. es como que atarlo principalmente a la ciudad y que ahí te salga como el departamento o el país simplemente si me va a entender? para que no sean tres campos los que uno tenga que editar sino simplemente con el campo ciudad que ya la persona como escoja

Eso, ¿qué opinas? Está bien, me lo doy.

Eso no creo que sea el problema, la verdad. Y lo otro que dice Daniel es que si ya un tatuador se dio como sus ciudades... por ejemplo, vuélvete acá ya con un segundo

y darle también cali

por ejemplo en el perfil del tatuador cuando escoja como las ciudades es que también las pueda setear como así, si me entiendes? que él ya pueda preseleccionar con el mismo tipo de buscador del google maps las ciudades donde el tatúa y que quede ahí como una barrita con que se pueda como

Parce, quite la pantalla por lo que estaba haciendo el mocap.

Yo lo que le estaba diciendo es que en el perfil del tatuador salga como aparece ahí en Kayak, entonces mira que en el origen le estamos agregando varias ciudades, entonces dale click y ponle Medellín, Amico.

Genial, con eso no toca primero país y luego ciudad, sino que una vez sale ciudad y país con solo escribirla. ajá y el otro referente que yo le ponía Cami

Podrías ayudarme con algo? Si

Dale, me puedes dar el programa con el que fuiste construido?

por eso

Me llamó un agente de voz de Movistar, me dijeron que están re malos los agentes de voz Vendele, vendele los tuyos

¿Tienes un hotel? Es como que hay marica aquí Ahí me llama uno que ahora está Oye, no sé qué, no sé qué Una regadera, qué dice

creo que vamos bien esta muy feo todos los que hay en el mercado muy feos pero bueno entonces que pena hay la interrupción muchachos entonces ya pues claro mas o menos como lo planteamos, cierto? Sí, ¿me escuchan? Sí, señor. Les quería hacer una propuesta. Esto, o sea, montándolo de esa forma...

Esa sección de lo de la ubicación puede funcionarse con esta parte de lo del contacto y disponibilidad, porque me parece que tener un... un paso solamente para la ubicación pues como raro y y lo otro que les quería proponer era que esta vista de jalar la información personal del usuario, volviera a ser lo último que hacemos de la hipotización. Porque siento yo que es más fácil que una persona entre y empiece a usar el aplicativo cuando vea.

cosas más simples que hay en la campus, es decir...

Sí, yo también.

genera fricción, si me entiendes, osea como que yo entrar y de una pum un formulario con mis datos de contacto es como que uff que pereza si ademas que si en cambio si uno hace todo el ejercicio de cotizar y seleccionar pues ya dice como que bueno ya llegué hasta aquí pues ya voy a poner los datos de contacto

Si me entiendes? A mi en lo personal si me gustaba mucho mas como estaba antes Él lo había dicho como para no perder esa información de los clientes que de repente si no terminaron de llenar el formulario pues que quedara por lo menos el contacto de ellos.

pero sí coincido en que puede generar fricciones, o sea como que desde el principio se pone aburrido, en cambio en el proceso siento que es muy llamativo cuando uno empieza a ver los modelos. Como, bueno, ¿qué ciudad eres? Y, ah, que sí es hombre, que sí es mujer, que lo quiero aquí, en el brazo, en la pierna, y esta subsona y demás. Entonces, como que...

Tal vez la gente se anima un poco más a terminar, a complementar todo el formulario.

Sí, coincido, coincido.

Y están tan ansiosos.

Este sería el campo de donde me quiero tatuar, pero ya no país, ciudad, departamento, sino simplemente una búsqueda dinámica, un autocompletar. Yo propondría que esta fuera lo que la persona vea apenas dentro de la página, los estilos.

Ya a esta le sumamos la ubicación, porque la ubicación si es un filtro importante pues en la selección del tatuador, si me entiendes, porque no tiene sentido ahí Dani, que alguien escoja un tatuador, si el tatuador no cotiza, no tatúan, etc. si no es mejor primero la ubicación

arriba de éste ponen la ubicación cami y la selección de estilo ¿si me entiendes? que esta vista igual se pone pues en día solo se llenara un campo y la selección del estilo Igual lo de los santuarios sale después abajo, ¿no? Sí, por eso. Pero entonces el paso uno sería ubicación, que quedaría aquí arriba. Siendo una barra, una barra de buscador acá, fil de primera. Ajá.

¿Les parece bien? Sí ¿Te tomo cómodo otra vez? Usted mira, Camilo Si quieres, o sea, la barra de kayak, por ejemplo, o la del... Google Maps sería el buscador aquí, o sea, como el primer paso. Sí, acá arriba. Ahí seleccionas ya el estilo y vas a... No, no, no, pero ¿por qué? Pero ¿por qué? O sea, primero la ubicación. Es que no entiendo por qué hablas de estilo cuando estamos mirando y te vas a decir, boom, la barra acá arriba.

Y luego esto igual, o porque está al otro estilo con la barra. Sí, exacto. O sea, paso uno de esta pantalla a escoger la ubicación.

y filtrando estilo y ubicación pues te salen las opciones de tatuadores, si me entiendes? Porque no tiene sentido que yo escoja a Daniel, pero yo quiero tatuarme en Buenos Aires, ¿si me entiendes? Podemos incluir entonces, bueno no, como mostrar las ubicaciones de los tatuadores acá de pronto.

Yo creo que... ¡Adiós! ¿Si me están diciendo el por qué? Yo veo que debería ir los dos primero.

Sí, sí, yo te entiendo. La búsqueda del tatuador está atada realmente a qué estilo hace y dónde lo hace. Entonces podemos la ubicación, podemos el estilo y eso nos da también los tatuadores.

Y aquí pues habría que incluir lo de las imágenes que no lo haya montado tampoco todavía. Queremos hablar en algún momento.

Que igual nos fuimos por la opción 2 si no estoy mal, ¿cierto? La opción donde sale un modal. el por ejemplo es tatuado

¿Dónde están ambos? Ya te los mando.

Ahí la mandé de nuevo al chat del señor Aliebre.

cuando quisiéramos ver más, se le puede poner un iconito de un ojito al tatuador o algo parecido

decirle como que conoce mas de este tatuador y que le salga el modalcito

¿Te acuerdas? ¿Esta 2? ¿La opción 2? Sí, la opción 2. ¿Cierto, Dani? Esa fue la que escogimos.

Es decir, cómo saldrían las opciones de los tatuadores. La opción 2 es cuando uno pica sobre el tatuador.

hay que ver más o seleccionar patrullador porque ya sabes igual las miniaturas también pues las habíamos hablado queda mal, o sea era como una mezcla entre la opción 3 y la opción 2

Bueno, con respecto a lo que hay aquí…

prioricemos el modal, cierto que las miniaturas pueden ser despues

Es decir, en esta versión pequeñita no se mostrarían tatuajes de los tatuadores, solo como información de ellos, ¿o qué?

¿Cierto? Pero pues decir como que venga Tiremos cual primero Mostrar las miniaturas ahí O mostrar el modal ¿Cuál es el modal, Rodri? ¿El segundo es el modal? Mira, ahí te dicen el título. Modal del tatuador.

Entonces, tener las miniaturas, pero, pues, como las miniaturas son miniaturas, pues poder ampliar la información con un modalo.

sino que, y luego pues igual en el model tampoco van a estar las imágenes en full tamaño, ¿no?

O sea, me refiero es que, digamos, se abre el modal. Igual, la persona ve las imágenes un poco más grandes, pero es tampoco para ver fully si se les da la capacidad de que clique encima del modal para ver. Y otra más grande es como dos capas encima de la interfaz normal y me parece que ya es too much. Lo que yo propondría sería así tal como lo tenemos en estos momentos.

No sé si es a mí o a Camilo, ¿qué se le corta? Él ya no cómo, cómo está. Cómo está.

¿Escucharon? A mí se me cortó.

Lo que decía era que… lo que propongo es que esto quede exactamente igual como lo tenemos, agregar como tenemos los estilos. ubicaciones y poner también debajo pues imágenes en miniatura dependiéndose de el estilo que se seleccione, pues la imagen que va de cada uno de los sectores con las tablas configuradas y las tablas configuradas

pero que y que haya como un botón aquí a la derecha que sea como una lupita o un signo más que si la persona se hunde, no hunde, habrá una pestaña nueva la vista del tatuador y va a llegar algo como esto, pues. Y aquí ya va a tener las imágenes y las tiene, y las puede ver con el más detalle. Me gusta eso de que muestre las imágenes solo el estilo que ya.

reseleccionó el cliente, porque si de repente un artista hace muchos estilos, pues de nada sirve mostrarle en esa partecita como... tatuajes blackwork en sombras si esa persona está cotizando algo a color si me gusta eso

Por eso les digo que es más fácil simplemente montarle un botoncito aquí y que me haga el redirect a esta vista que igual ya existe y agregar solamente los... Bueno, sí. Pero sí, de pronto cambiar un poco la estética de cómo se ven ahorita esos botones. Digamos, ¿sabes qué me gusta mucho? Cómo se ve la parte, si quieres entra ahí a Liebre.inc.

Y bajo más eso. Siento que de pronto eso se vería mejor. Y ya pues que salga el botón, pues.

no sé qué opinan

Op, ya yo aquí y acá he creado una imagen.

¿Les manda por Pinochoc? No.

¿Qué tal algo tipo así?

¿Qué es esto de acá? ¿Es una bandera o algo? Ah, no, no, no. Pues como lo estoy haciendo aquí rápido con ella, pues tú sabes que a veces se descachan algunas cositas, pero... Si, se supone que serían las banderas, pero pues... Ahí podríamos poner otra información, ¿no? De pronto, no sé, si es un tatuaje en Cali, pues que salga... Bueno, es que no conozco barrios de Cali. Ciudad Jardín, Siloé, no sé.

Si de pronto alguien se quiere tatuar en esa ciudad y que de pronto pueda ver el barrio, la localidad, o de pronto ya es información irrelevante, simplemente poner ahí los estilos, el nombre. su calificación y algunas imágenes de los tatuajes.

Entonces, siempre toca darle foco a Mobile, y a mi este diseño en Mobile me parece que esta cool. Ay mira, aquí se ve bien, pues yo aquí viéndolo en el teléfono. no se ven tan pequeñas las imágenes de los tatuajes. O sea, no alcanza a percibirlas. Y ya, pues, si uno quiere ingresar, pues le dales ahí y entonces picar en el tatuajero, que haya una sección donde se pueda agrandar. Lo mismo que hicimos con...

con las imágenes de los estilos. De repente uno pica en la lupita y se agranda la imagen si uno quiere verla mejor.

Yo creo que el aguacate está bueno.

este momento. Dale, ¿está bien? No me quieren aquí.

para leerlo antes de que te vayas y quieres ahí hice un mocap de pronto de la de la presenta de la imagen que se va a enviar a facebook Pilla ahí en el grupo, si quieres, y para que todos, pues, no sé. No, yo creo que mi queridísimo jefe lo metió en ese grupo.

Ya te agrego, ya te agrego, un segundo.

No, no, no, no te preocupes, solo, todo tranquilo. Pillarro, sería de pronto esta estructura, siento que estaría interesante y pues ya le corregimos ciertas cositas, como los íconos, el logo que tenemos ahorita de Flowing.

Y pues siento que esto resume muy bien nuestra aplicación, como el problema y nuestra propuesta para solucionar. esos dolores

Está cortando, Rodri, ¿sabes qué?

Y nos vemos en el próximo video, ¡hasta la próxima!

lo que hace la aplicación

Ponemos esa o ponemos como la...

¿El landing que ahorita está en liabre.inc o cuál creen que se podría poner en ese mockup?

Esto está bien. ¿Eso? Listo. Ya, ahorita lo modifico. Pero esperamos a Rory... Ah, ¿sí salió? Sí, porque estaba molestando en el interno. No sé si salió, pero no...

¡Una!

Pues Kame, yo creo que si quieres podríamos, mientras tanto, hacerlo así como está en libre.bin, que sale como la imagen de los tatuadores. subí Instagram y ya, y ya eventualmente hacerlo así como lo envié en el WhatsApp, ya con las imágenes de los tatuajes y demás.

Si sientes que ya hay que dedicarle mucho más tiempo a esa otra. Pues en ese momento ya tiene todo eso realmente estaba es de otra manera, es una empresa. Mira que aquí está la imagen, está el texto. Es como reorganizarlo, pero entonces no es complicado.

Exacto, sí. Sí, de pronto ir agrandando pues la imagen del tatuador y demás para que no se vea como tan serio, que siento que en este punto se ve como un poco. Sí, como muy serio. De pronto el otro es más llamativo, ¿sabes?

¿Esto se actualiza sin problema, Dani? Ya le atrapé lo de las imágenes y ahí tengo que levantar algo. Ahí tienes el calizado para buscar las imágenes. Es algo misterioso, no es en realidad lo que es. De una.

Eso se ve ahora a la vista, el mensajito, lo del whatsapp y lo del calendario abajo y ya. A ver, déjame ver.

¿Sabes qué? Siento que... lo del tema del tamaño, porque ahorita está saliendo pequeño, mediano, grande, muy grande. pero por lo menos ahorita que yo estaba pues bien contestando algunas de las cotizaciones que me entraron por la página como que me tocaba meterme al link para ver exactamente qué cuál era ese tamaño porque no me acuerdo qué era lo que habíamos dicho si pequeño era entre 6 y 8 centímetros o algo así

Entonces estaría mejor que en ese resumen, ahí donde dice tamaño, salga pues los tamaños en centímetros. Sí, eso sí es. No, la mía no lo había visto. Sí, porque ahorita yo me tardé un poquito en encontrar en dónde era que salían los tamaños y si entras a la sección de cotizaciones, pues de todas las cotizaciones que han entrado,

Parece que sale súper pequeñito el tamaño como en la parte inferior de todas las cotizaciones. Puedes ver ahí alguna cotización. Es que quiero quitar esto del sexo, el estilo que voy a dejar, porque prefiero meter, por ejemplo, esta sección de lo de la imagen, de lo que es lo de la parte de poner las imágenes que estamos usando. Quiero darle como una pasadita.

No sé, pero Zimbabwe me sirve y esto ponerlo como más visible y disponible también. Sí, había algo que les queríamos comentar también con respecto a la disponibilidad. Nosotros tenemos como pronto una, dos, tres, quería como cambiar este dropdown para que fuera como unos bloquecitos que se puedan seleccionar, como solo tenemos tres opciones.

es como, que sea como tres bloquecitos que es el drop, no me parece como muy importante el trío.

Sí, me parece. Y... Tenemos... Pronto...

Quisiera dejar como estos y un pronto que sea como uno o dos y el otro como de dos semanas a un mes. o más, entonces como que de ahí para adelante y lo que quisiera es cotizar nada más. Sí, me parece bien, que queden como botoncitos pues independientes.

Si eso es lo que yo tengo en mente, creo que voy a regresar a usar esto.

Y entonces al final de la cotización también te deja ver lo del caléndar, hay uno que podría hacer. O sea, como, como... como cliente o sólo se puede visualizar como está de agenda del tatuador.

ahí la versión web si se pueden borrar las imágenes cuando no la suben la cotización si Es lo que te digo, Dani, ¿verdad? Te sale esto acá arriba y acá. Ah, pero no se lo puse. No, chau, weá. Esa es la actualización, pero no la puse como con un tatuador.

Ok. Sí, sí, sí.

Que pena chingas, tenia que hacer una llamada

Y con esto me voy a volar otros dos minutos.

Vale.

Un saludo.

Y yo aquí puedo seleccionar un espacio. Le puedo crear el evento. Esto no lo actualicé ayer tampoco, pero es el que queda y que ya queda reservado y ya luego no se puede volver a usar más.

Ok.

OK, OK, OK.

Listo chicos, que pena

¿Quién decidió estos 10 minutitos que me ausente? En la parte inicial, en donde... bueno, que ahorita no va a ser en la parte inicial, sino en la sección en donde uno pone qué tan pronto quiere la cita. ¿Te acuerdas que salía como pronto, de 1 a 3 meses y demás?

Eso se seleccionaba como en un, no sé cómo se llama eso, como que uno picaba y salían como las tres opciones. Entonces, como son solo tres opciones, que más bien y quede como tres botoncitos independientes.

Otra cosa, estábamos mirando cómo había que hablar de Whatsapp. y lo del tema del calendario, sino que ya viene Cami, dijo que ya volvía.

como tú lo veas pues yo de momento estoy bien

Igual yo aquí en paralelo estoy organizando lo del banner.

Entonces, ¿viste la imagen que envía el grupo, sí? Lo del banner. ¿Qué mocap pondríamos ahí en ese teléfono?

¿cierto? ¡Si!

¿Viste? Al lado derecho está el teléfono. Ahí, en ese. O sea, dejamos esa parte del WhatsApp que dice que la cotización está lista o el landing de... de señora Liebre, bueno el que sale ahorita en Liebre.inc o cual crees que podamos poner ahí.

Y cualquiera de las opciones me gusta, pues...

muy bonitos no? osea esteticamente me parecen muy agradables

de una y como es lo de los puntos que pues hay del problema y nuestra solución

Listo, entonces aquí lo voy corrigiendo.

Sí, sí, sí, y mejorar los íconos y todo.

Esto es todo amigos, nos vemos en el próximo video, un saludo.

de fondo no sé idea como la foto del que tiene como estilo como de pirata que tenemos al final El piloto, aquí está, como una maquina, sí, y un...

Listo, aquí estoy.

Un saludo.

Bueno, ¿será que Kami se demora? No, sí. Ya está, ya está. Una otra esperando a ti.

Y me vas a mostrar lo del calendario. ¿No lo viste ahorita, Dani? Lo hemos... Pero entonces, eh... Es que como ahí uno solo puede seleccionar una fecha y pues depende del proyecto qué tan grande es y demás, pues ya uno decidiría, pues el artista sería quien decía en qué espacio se podría.

Porque si de repente selecciona, no sé si él ve que tengo un espacio en la mañana, pero de repente ese tatuaje es de todo el día. Entonces creo que ahí...

¿Para mí? Para hoy.

Sí, ya estamos mirando también.

Más información de la coordinación normal.

¿Ves que en esa parte Kami necesitas un mocap de la parte de arriba o es claro? Pues ya partiendo de los dos referentes de Kayak y Google Maps. No, es claro, hay que montarlo. Aquí obviamente hay que escoger un tatuaje que tenga calendario integrado, no sé si de pronto poner algún indicativo que…

¿Se puede agregar agendar citas con él, no sé, parece, o no es relevante? Yo creo que en este punto, como no darle la libertad al cliente de que él elija el espacio, porque de pronto y él, o sea, me ha pasado. Te cuento ahí por qué lo creería. Me ha pasado que hay clientes que me dicen como mira, me quiero hacer esto, esto, esto.

Y yo le doy el precio y le digo, bueno, tengo libreta al día. Y me dice, ah, listo, perfecto. Y yo después les escribo como, bueno, para agendarte tienes que hacer una ONO. con eso empiezo el diseño y te reservo el espacio no sé qué y me deja o sea ni siquiera miran el mensaje sino que llegan el día que yo les dije que tenía libre sin haber mucho un abono y eso entonces a veces como que los clientes

no sé, como que dan ciertas cosas por hecho. Entonces, de repente sí seleccionan ahí en el calendario como bueno, yo me quiero tatuar el 22. y dejan hasta ahí, no esperan a que uno les conteste de repente y puede que lleguen al estudio ese día o algo así. Lo digo porque nos ha pasado.

Bueno, lo que hay en el calendario, en la última parte, no es la cita para el espacio del tatuaje, esto lo demostramos. Es como, ¿dónde entra toda esta plataforma, todo el proceso de cotización dentro de lo que es el flujo de todo el proceso de crear el tatuaje?

Yo lo que les había propuesto es que esa cita que se saca es un espacio, una reunión de kick-off. Kick-off es como la primera reunión que se tiene de cualquier proyecto. en la cual tú y el cliente se sienten a hablar, porque sí, él puso datos, llenó formularios, descubrió imágenes, lo que sea, pero no ha tenido contacto con una persona, no ha hablado.

y listas y el canal en el que el.

El Espacio te invita a que envíes las cotizaciones por WhatsApp, le puedes mandar un mensaje por WhatsApp, le puedes mandar un mensaje por Instagram, que es lo que está montando ahorita Santiago. Pero de todas formas eso tampoco es una, pues como eso no se te da nada, o sea, y en su momento lo habíamos hablado y dijimos como bueno, si una primera reunión para que la gente, pues para que el tatuador y el cliente definan cosas, está bien.

Pero, pues bueno, no sé entonces igual qué se quiere hacer con esto ahora, porque entiendo que no es un caso de uso, según me dice Daniel. Sí. Es como, bueno... Si tenemos todo esto, si tenemos toda la cotización, si tenemos todos estos datos que hemos recolectado del cliente, ¿no es cierto?

Bueno, pues no nos vemos, chau.

Yo, ¿qué hago? O sea, ¿qué pasa después de esto? ¿Qué pasa cuando ya está la cotización? ¿Qué pasa cuando ya se envía o no se envía el mensaje? ¿Qué pasa cuando…? Tú ves la cotización, luego le escribes a la persona, que ahí hablas con él, que trabajas con él. Después de eso, ¿cuánto tiempo pasa para que paren la cita per se? Y bueno, porque es que en estos momentos, el club no llega hasta que se crea la cotización.

pero no hay nada, no hay nada más de ahí en adelante, entonces ¿qué se va a hacer? ¿qué quieren hacer?

Quería que lo mejor en este punto es que finalice aquí en ya ponernos en contacto con el cliente y ya hay definir entonces las fechas para el tatuaje. y procederá al tema del abono. Entonces...

Yo creería que eventualmente podríamos, en el tema de las cotizaciones, donde está el apartado de todas las personas que han escrito, que haya un botoncito donde uno pueda como continuar con esa cotización y asignarle a una fecha, asignarle una fecha, pero que lo hagan los artistas.

Sí, y aquí ya ponen fecha y ahí pueden poner, no sé si el precio o el... Sí, bueno, poner el precio, cuánto abonaron y cuál va a ser la fecha en que se va a ejecutar el tatuaje o si va a haber una cita previa. para que ya el aplicativo genere la invitación con toda la información que les envíe en algún momento.

Pero ya esto sería como un paso extra que se haría después de hablar con el cliente.

No sé tú cómo lo ves, Cami.

Pues no, no sé, estoy escuchándote porque quiero entender cómo va a ser el flujo, esta vez que se puede montar. Pues mira que yo creo que puede ser...

Chau. entonces en algún punto lo que se podría hacer es como que listo ya la cotización queda aprobada cierto entonces ya eso cuando la persona vuelva a entrar a la cotización pues ya le dicen mira este es mi calendario y ya te puse que la sesión dura tantas horas entonces mira de la agenda que yo tengo ahí

es donde quieres agendarlo ¿che me entiendes?

Ok O que el mismo tatuador pues ya pueda decir venga ya me piso el negocio entonces lo gestiono por aca Si osea como que sea ambas opciones las que se pueda dar Normalmente no se como es lo mas común Pues fíjate que la mayoría lo que hacemos es que, por ejemplo, ahorita que estoy agendando el mes de febrero.

Entonces, cuando ya alguien me dice que si se quiere tatuar, que le pareció bien el precio, cuando me envía la bono, entonces me dice, bueno, qué fechas tienes disponibles? Entonces yo les empiezo a. ofrecer los espacios más cercanos. Sí, porque es que si de repente les ofrezco un espacio a finales de febrero, pues de repente puede que tenga la primera semana de febrero libre. Entonces lo ideal es como ir llenando primero.

los espacios libres que tengo más cercanos. Entonces a veces soy como, parce, solo tengo libre el 8 y el 7 de febrero, cuando en realidad tengo todo, tengo del 15 en adelante libre. Entonces ellos me dicen como un par, si no tienes más días. Entonces ahí les empiezo a ofrecer otros. Pero prioridad llenar como esos primeros espacios. Entonces por eso a veces siento que es mejor como que uno como tatuador.

maneje ese tema de la agenda.

y no lo dejo, como que fuerce a que pues digamos la dirección a que sea lo más pronto posible. Sí. Pues, no sé, digamos como pensándolo en...

En el tema de cuándo son proyectos grandes y demás. Creo que es más fácil que el tatuador maneje ese tema.

Porque de repente si también es un tatuaje pequeño y se puede acomodar en un día donde yo también tenga ya agendados dos tatuajes pequeños, que hago no sé, en la mañana y en la tarde queda libre. pero si de repente el cliente ve que esa fecha ya está ocupada, pues se va a lanzar a ocupar otro espacio, cuando en realidad pudo haber ocupado ese espacio que se veía lleno, pero en la tarde.

No sé si me hago entender.

Que hay un tema importante, es el factor del tiempo, de cuánto tardaría cada proyecto para uno poderlos acomodar. Porque, pues, realmente... Digamos, en mi caso, que cuento con muchas citas al mes, casi que uno hace Tetris con la agenda. Así como tratar de acomodar.

la mayor cantidad de citas posibles en esos días destinados para tatuar.

De 20, por ahí 4 o 5.

O sea, es un 25 por ciento.

porque pues hay que irnos por los baretos, que le solucionan la vida al 80% de la people o sea, priorizando obviamente pues en algún punto llegamos a... atacar ese 20% o 25%, pero entonces, ¿qué es lo más general que hoy podemos hacer? ¿Sí me lo entenderon?

Sí, bueno, sí tienes razón, concuerdo. Entonces sí que de pronto uno puede activar esa opción o desactivarla. Y ya dependiendo si el artista quiere que los clientes puedan... cómo agendar sus propias citas, qué se puede hacer, o si ya de repente el tatuador quiere él mismo escoger los espacios.

Está bien que se pueda hacer.

tal día, si me entiendes, osea como que tu ya en un proceso posterior de afinar la agenda pues ya puedes charlar con la gente pero pues ya sabes que tienes ya los deals cerrados osea ya los leads ya los conseguiste a través de la app ¡Gracias por ver el vídeo!

Y ya terminamos el tema de Juegue con mi Tetris de Agenda. Listo.

Pero entonces, en este punto, si dejaríamos el tema del calendario abajo, digamos ahorita donde se está mostrando pantalla debajo de lo del WhatsApp.

ahora mira que eso también era relevante lo que decía Kami que pues esto lo habíamos planteado como una especie como de sesión como de alineación o de kickoff con el usuario si me entiendes? osea como decirle venga pues ya va realmente a a que es a a tatuarse entonces

démonos como un espacio para conversar más en detalle de la idea porque pues es muy probable, Dani que las personas, pues te den una descripción muy escueta de lo que quieren ¿si me va a entender? osea te dicen, no, hay unas flores que me recuerdan a mi abuela pero pues ¿qué flores?

¿cómo la quieres? ¿qué estilo te gusta? o ¿qué referentes tienes? ¿si? de pronto queda como parte de la información levantada pero quizás si toca hacer un proceso de refinamiento es como lo vemos nosotros desde la ignorancia Sí. No sé cómo sea en tu caso personal. ¿Te acuerdas que en alguna ocasión lo habíamos conversado y que...?

pues que podían haber espacios para asesorías, ya los espacios para realizar el tatuaje como tal y demás.

Lo que me da miedo de esto, puntualmente, es que, de pronto, si aquí uno va a agendar una asesoría...

que de repente empiecen a haber muchos clientes que agenden asesorías y que no asistan a esas asesorías, porque pues es tiempo perdido para el artista. Si a veces uno pactándolo con el chat, o sea directamente con el cliente, y son asesorías, por lo general asesorías que no tienen costo.

sino que son asesorías gratuitas. Entonces pactamos un día como bueno, veámonos el sábado a las cinco. Parece. Yo creo que por ahí el 20 por ciento de las personas llegan. el 80 por ciento no llega. O sea, cuando no hay un pago de por medio, a las personas les da igual y juegan con el tiempo de uno. Entonces.

siento que tal vez aquí poniéndosela tan fácil a los clientes de bueno vamos a agendar este día para una asesoría virtual no sé qué pues de pronto no se conecta la llamada y lo dejan ahí a uno esperando y no se conecten porque es es es muy común

tatuador que le llegó una cotización pues podemos tener algo que le escriba al usuario y le diga vea recuerde que mañana tiene una cita de asesoría con tatatatata ¿Vas a asistir a la cita? ¿Si me entiendes? Si Eso también se puede dejar automatizado y pues probablemente mitigue Dice la persona

Dice que no, pues de una, ¡pum!, te libera la agenda.

OK.

¡Gracias por ver el video!

igual pues yo diría a Dani o sea como que para ser muy efectivos yo creo que pues tendría que bloquearse y no dejar como toda la agenda abierta para asesorías sino decir venga pasesorías tengo los sábados en la tarde

¿Se me va a entender? Sí

O sea, en este momento, Cami, lo que es posible es simplemente agendar un espacio de kickoff, ¿cierto? O sea, no se puede agendar un espacio más amplio, por ejemplo, para…

Cierto. Sí, bueno, entonces ahí tocaría corregir el texto, pues, para que eso eso claro y que las los clientes sepan que. Es un espacio de asesoría.

Igual, aquí echando cabeza lo que dice Dani, me parece que en ese sentido no dejarla abierta pues como para que eso no se llene. y le dices como para conectar la hoja con el tiempo de año y lo que decía él

¿O todavía no está? Sí Así es como yo integro el calendario, ¿cómo así? No, sí, o sea, me refiero... integración, si no, ¿el tatuador en este momento ya puede bloquear agendas? No. aquí, por ejemplo, también no lo sé.

No, o sea, es que eso es lo que habíamos hablado, que nunca se montó, que Daniel decía que él tenía varios tipos de eventos, yo le decía que nosotros podíamos crear, experimentábamos las plantillas y eso nunca se volvió a tocar.

Pero, a lo que les iba yo tenía una idea, Rodri, y me cuentan que pienso. Lo que decía Dani era que la... figura del calendario, es ver acá la cotización de parte del tatuador más que del cliente, entonces mi propuesta es la siguiente. Primero que nada, se quitaría esta sección por completo de la vista de la confirmación, y aquí en la vista de la información de la cotización, que haya una…

un botón, algo que sea como compartir calendario. Y que el compartir calendario, pues, sea así mismo. O sea, que el compartir calendario te copie una URL. que te lleve a ver algo que es exactamente esto, pero que ya no te sale en la vista cuando termina la cotización, sino que te sale cuando el tatuador te lo comparte.

Entonces pues ahí estamos como cerrando pues la puerta de que no lo pueda ser cualquiera. Y ya cuando la persona pues vaya a escoger su espacio pues ya le vemos. Aquí en este momento se nos deja hacer nada más que sea como un evento de una hora. Es más bien como que cree el evento, pues, segundaria es una configuración más general de tal hora a tal hora. También ponemos, pues, en el título sea un rango más de x tamaño de tiempo, que es para que sea una ventana.

Pero igual esa ya va en la mano con que se tenga claro cuánto espacio se va a requerir para el espacio. Y, digamos, si se llega a decir como, ay, no, yo quiero que sea una democracia de esas intentes, pues que Daniel o cualquier patrocinador pueda compartir ese espacio.

limitando lo que le va a permitir al cliente agendarse, no pues cómo lo va a compartir. Entonces, podemos tener un botón que irá como, eh. En la reunión de equipo, no necesariamente con ese nombre, pero algo así. Y la otra sea como generalcita tatuaje.

un rango más grande y pues va a permitir que el usuario, pues, coja un espacio más grande, entonces. Pero que salga como de aquí, como decía Dani, y que no, pues, les hacemos esa puerta como a todo el mundo.

¡Gracias, Augusto!

Yo sé que dos placeres dije, me refiero a que todo depende del tatuador, que se cierra la agenda pública para que la gente no hagan de cosas que Daniel no está permitiendo. Y ya pues depende de él que comparta su calendario a partir de una cotización que ya se creó. No es que la persona cliente escoja el espacio, sino que Daniel le diga, bueno, ya.

¿Hiciste cotización? Bueno, te comparto este enlace para que mires mi disponibilidad y puedas agendar un espacio y que la selección del espacio, pues, sea según lo quiera, Daniel, si es un espacio corto, si es un espacio grande, ya para gestionar el tatuaje.

Tiene más. A mi me parece buena opción.

del perfil, entonces si cotizaron ya contigo pues ya no se muestra y si de pronto un tatuador dice nada a mi si que me agenden y me lleguen la agenda. Bueno, también. También porque igual desde la cotización presentamos, o sea, él te va a dar generar.

la misma vista que se va a ver acá, entonces, pues, él igual también se va actualizando según la disponibilidad, entonces, dependiendo de los cambios abiertos también. Y, Rodri, lo que me estabas preguntando de cómo se ve. Eso es el tema del calendario. Aquí en cómo es la configuración del perfil, se sale este.

Esa es la integración, pero yo decía que había como un tipo de gestión del calendario. A lo que lo voy a recrear haciendo eso, pero... Simplemente en ese momento, hasta donde vamos es de consulta. Ajá.

Sí, entonces ya eso sería algo post-cotización, cuando ya uno dé precios y demás, y ya ahí entonces, si quieres ya... Después hago unos mock-ups también de cómo podríamos manejar eso. Tanto si se va a abrir un espacio para asesoría o si ya va a ser para tatuaje, que de una u otra forma uno pueda dejar el esporte, pero esto va a durar seis horas.

y que uno también pueda bloquear los días del calendario. Como bueno, yo no trabajo ni miércoles ni domingos y empiezo a tatuar los martes desde las ocho de la mañana y los miércoles desde las. desde el mediodía y demás eso yo lo había pensado aquí en la sección de calendario digamos si ya tienes como configurado el acceso es como yo en este momento que ya está como seteado

En la parte de abajo te salga como, eso que tú dices, como yo selecciono qué días quiero trabajar, pues trabajar es como que se pueda agendar el espacio. y también poner unos rangos horarios, no tengo la idea de cómo se verían pero básicamente podemos decir no sé qué días de semana y que salgo con estos electores, lunes, martes, miércoles, fines, etc.

Y que cuando selecciones cada uno, pues te salga un detalle de los válvulos de horario de ese día seleccionado y que puedas ajustarlo también. Ajá. Listo. Entonces, venga. ¿Qué les parece? Ya que nos queda más o menos una hora.

¿Les parece bien? Porque ya hemos mapeado varias necesidades que hay Pero entonces para aterrizarlas y definir cuáles son las prioridades y con cuáles iniciamos para que no quede todo en la cabeza de Kami, sino que lo aterricemos listo? listo si Entonces, ¿les parece si nos damos un brexito de 10 minutos y retomamos a la de cuarto? Así pues podemos ir al baño y de todo.

Y empezamos a priorizar, ¿vale? De uno Dale Bueno pues, entonces nos vemos en 10 minutos Bueno muchachos Ya hablamos, chao.