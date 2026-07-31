(function () {
  "use strict";

  window.__BRAND__ = {
    name: "Titan Fitness",
    legalName: "Titan Fitness Chamberí",
    tagline: "Entrena como si el resultado ya dependiera de hoy",
    kicker: "Titan Fitness · Madrid · Desde 2011",
    phone: "+34 910 223 456",
    phoneHref: "+34910223456",
    email: "hola@titanfitness.es",
    address: "Calle Fuencarral 128, 28010 Madrid (Chamberí)",
    mapsQuery: "Calle Fuencarral 128, Madrid",
    hours: {
      weekdays: "Lunes a viernes: 06:00 – 23:00",
      weekend: "Sábados y domingos: 09:00 – 14:00"
    },
    social: {
      instagram: "#",
      tiktok: "#",
      youtube: "#",
      facebook: "#"
    },

    trustBadges: [
      { value: 2500, suffix: "+", label: "Miembros activos" },
      { value: 30, suffix: "+", label: "Entrenadores certificados" },
      { value: 15, suffix: "", label: "Años en Chamberí" },
      { value: 98, suffix: "%", label: "Satisfacción verificada" }
    ],

    stats: [
      { value: 2500, suffix: "+", decimals: 0, label: "Miembros activos", icon: "users" },
      { value: 30, suffix: "+", decimals: 0, label: "Entrenadores certificados", icon: "badge" },
      { value: 15, suffix: "", decimals: 0, label: "Años de trayectoria", icon: "calendar" },
      { value: 98, suffix: "%", decimals: 0, label: "Satisfacción verificada", icon: "heart" }
    ],

    services: [
      {
        id: "musculacion",
        name: "Musculación",
        icon: "dumbbell",
        desc: "Zona de peso libre y máquinas Eleiko con registro de cargas por sesión y progresión guiada.",
        tag: "1.200 m²"
      },
      {
        id: "crossfit",
        name: "CrossFit",
        icon: "flame",
        desc: "Box de 300 m² para WODs diarios en grupos reducidos de hasta 12 personas por clase.",
        tag: "Grupos de 12"
      },
      {
        id: "cardio",
        name: "Cardio",
        icon: "activity",
        desc: "Cintas, remo y bicicletas con lectura de potencia y frecuencia cardíaca en tiempo real.",
        tag: "Datos en vivo"
      },
      {
        id: "funcional",
        name: "Entrenamiento Funcional",
        icon: "target",
        desc: "Circuitos con kettlebells, TRX y sacos búlgaros guiados por entrenador certificado.",
        tag: "Guiado 1:1"
      },
      {
        id: "yoga",
        name: "Yoga",
        icon: "leaf",
        desc: "Sala climatizada con clases de vinyasa y movilidad para acelerar tu recuperación.",
        tag: "Sala climatizada"
      },
      {
        id: "boxeo",
        name: "Boxeo",
        icon: "boxing",
        desc: "Ring reglamentario y clases de técnica y sparring controlado, guantillas incluidas.",
        tag: "Ring reglamentario"
      }
    ],

    plans: [
      {
        id: "basico",
        name: "Básico",
        price: "34,90",
        period: "/mes",
        featured: false,
        desc: "Para quien quiere entrenar por su cuenta con lo esencial.",
        features: [
          { text: "Sala de musculación y cardio", included: true },
          { text: "Horario 06:00 – 23:00", included: true },
          { text: "App de seguimiento de progreso", included: true },
          { text: "1 clase grupal por semana", included: true },
          { text: "Acceso 24/7", included: false },
          { text: "Entrenador personal", included: false },
          { text: "Evaluación InBody trimestral", included: false }
        ],
        cta: "Elegir Básico"
      },
      {
        id: "premium",
        name: "Premium",
        price: "59,90",
        period: "/mes",
        featured: true,
        badge: "El más elegido",
        desc: "Nuestro plan más equilibrado: clases ilimitadas y acceso total.",
        features: [
          { text: "Todo lo del plan Básico", included: true },
          { text: "Clases grupales ilimitadas", included: true },
          { text: "Acceso 24/7 con app", included: true },
          { text: "2 sesiones de entrenador personal/mes", included: true },
          { text: "Toallas y taquilla premium", included: true },
          { text: "Evaluación InBody trimestral", included: true },
          { text: "Plan de nutrición personalizado", included: false }
        ],
        cta: "Elegir Premium"
      },
      {
        id: "elite",
        name: "Elite",
        price: "99,90",
        period: "/mes",
        featured: false,
        desc: "Para quien busca resultados con seguimiento cercano cada semana.",
        features: [
          { text: "Todo lo del plan Premium", included: true },
          { text: "Entrenador personal semanal (4 sesiones/mes)", included: true },
          { text: "Plan de nutrición personalizado", included: true },
          { text: "Acceso a sauna y crioterapia", included: true },
          { text: "2 invitados gratis al mes", included: true },
          { text: "Prioridad de reserva en clases", included: true },
          { text: "Revisión de objetivos mensual", included: true }
        ],
        cta: "Elegir Elite"
      }
    ],

    trainers: [
      {
        id: "marcos",
        name: "Marcos Delgado",
        role: "Musculación y Fuerza",
        experience: "12 años de experiencia",
        bio: "Excampeón regional de powerlifting. Especializado en progresión de cargas y técnica de levantamiento.",
        photo: "assets/img/trainer-marcos.jpg"
      },
      {
        id: "elena",
        name: "Elena Vidal",
        role: "CrossFit",
        experience: "8 años de experiencia",
        bio: "Coach Nivel 2 certificada. Diseña los WODs semanales del box y lidera las clases de mayor exigencia.",
        photo: "assets/img/trainer-elena.jpg"
      },
      {
        id: "ruben",
        name: "Rubén Castillo",
        role: "Boxeo",
        experience: "10 años de experiencia",
        bio: "Exboxeador amateur con 45 combates disputados. Enseña técnica desde cero hasta sparring controlado.",
        photo: "assets/img/trainer-ruben.jpg"
      },
      {
        id: "laura",
        name: "Laura Méndez",
        role: "Yoga y Movilidad",
        experience: "9 años de experiencia",
        bio: "Instructora certificada en Vinyasa y Yin Yoga. Trabaja la recuperación activa de deportistas de fuerza.",
        photo: "assets/img/trainer-laura.jpg"
      },
      {
        id: "diego",
        name: "Diego Herrera",
        role: "Entrenamiento Funcional",
        experience: "7 años de experiencia",
        bio: "Especialista en readaptación de lesiones. Combina fuerza funcional con prevención lesiva.",
        photo: "assets/img/trainer-diego.jpg"
      },
      {
        id: "sofia",
        name: "Sofía Navarro",
        role: "Cardio y HIIT",
        experience: "6 años de experiencia",
        bio: "Excorredora de fondo y maratonista. Sus clases de HIIT son de las más solicitadas del centro.",
        photo: "assets/img/trainer-sofia.jpg"
      }
    ],

    testimonials: [
      {
        name: "Carmen Ruiz",
        meta: "34 años · Socia desde 2022",
        rating: 5,
        text: "Entré buscando recuperar forma tras el embarazo y me quedé por el ambiente. En 8 meses cambié mi composición corporal y mi forma de entrenar.",
        photo: "assets/img/testimonial-1.jpg"
      },
      {
        name: "Javier Soto",
        meta: "41 años · Socio desde 2019",
        rating: 5,
        text: "Trabajo a turnos y el acceso 24/7 del plan Elite es justo lo que necesitaba. Nunca he tenido que saltarme un entrenamiento por horario.",
        photo: "assets/img/testimonial-2.jpg"
      },
      {
        name: "Andrea Blanco",
        meta: "27 años · Socia desde 2023",
        rating: 5,
        text: "Las clases de CrossFit con Elena son exigentes pero nunca me he sentido perdida. Se nota que el grupo es reducido.",
        photo: "assets/img/testimonial-3.webp"
      },
      {
        name: "Iker Aranguren",
        meta: "52 años · Socio desde 2015",
        rating: 5,
        text: "Llevo 15 años entrenando en distintos gimnasios y este es el primero donde un entrenador revisa mi técnica sin que se lo pida.",
        photo: "assets/img/testimonial-4.jpg"
      },
      {
        name: "Marta Iglesias",
        meta: "30 años · Socia desde 2021",
        rating: 4,
        text: "El plan de nutrición del Elite me ayudó más que cualquier dieta que probé antes. Solo pediría más horarios de yoga por la mañana.",
        photo: "assets/img/testimonial-5.jpg"
      },
      {
        name: "Pablo Reyes",
        meta: "45 años · Socio desde 2020",
        rating: 5,
        text: "Volví a boxear después de 20 años parado. Rubén se adaptó a mi ritmo sin que en ningún momento me sintiera fuera de lugar.",
        photo: "assets/img/testimonial-6.jpg"
      }
    ],

    schedule: {
      slots: ["07:00", "09:00 – 10:00", "18:00 – 18:30", "19:30 – 20:00"],
      days: [
        { day: "Lunes", classes: ["CrossFit", "Yoga", "Boxeo", "Funcional"] },
        { day: "Martes", classes: ["HIIT Cardio", "Yoga", "CrossFit", "Boxeo"] },
        { day: "Miércoles", classes: ["CrossFit", "Funcional", "Yoga", "Boxeo"] },
        { day: "Jueves", classes: ["HIIT Cardio", "Yoga", "CrossFit", "Funcional"] },
        { day: "Viernes", classes: ["CrossFit", "Boxeo", "Yoga", "HIIT Cardio"] },
        { day: "Sábado", classes: ["CrossFit · 09:00", "Funcional · 10:30", "Yoga · 12:00", "—"] },
        { day: "Domingo", classes: ["Sala libre · 09:00 – 14:00", "—", "—", "—"] }
      ]
    },

    faqs: [
      {
        q: "¿Necesito reservar las clases con antelación?",
        a: "Sí, las clases grupales (CrossFit, Boxeo, Yoga y Funcional) se reservan desde la app con hasta 48 horas de antelación. La sala de musculación y cardio no requiere reserva."
      },
      {
        q: "¿Hay permanencia mínima?",
        a: "No. Todos los planes son mensuales y sin permanencia. Puedes cancelar cuando quieras avisando con 15 días de antelación."
      },
      {
        q: "¿Puedo congelar mi membresía?",
        a: "Sí, hasta un máximo de 2 meses al año por motivos de viaje, lesión o cualquier otra causa, sin coste adicional."
      },
      {
        q: "¿Qué incluye la evaluación InBody?",
        a: "Un análisis de composición corporal completo (masa muscular, grasa visceral, agua corporal) cada trimestre, incluido en los planes Premium y Elite."
      },
      {
        q: "¿Puedo cambiar de plan más adelante?",
        a: "Claro. Los cambios de plan se hacen efectivos en el siguiente ciclo de facturación, sin penalización."
      },
      {
        q: "¿Ofrecen alguna sesión de prueba?",
        a: "Sí, una sesión de bienvenida gratuita con evaluación inicial y recorrido guiado por las instalaciones, sin compromiso."
      },
      {
        q: "¿Tienen aparcamiento para socios?",
        a: "Sí, parking privado para socios en el mismo edificio, con acceso directo a vestuarios."
      },
      {
        q: "¿Qué pasa si falto a una clase reservada?",
        a: "Puedes cancelar tu reserva hasta 2 horas antes sin penalización. Las ausencias no avisadas de forma reiterada pueden limitar reservas futuras."
      }
    ]
  };
})();
