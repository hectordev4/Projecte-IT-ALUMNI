import '../../styles/components/testimonialCard.css';

interface TestimonialData {
  id: string;
  name: string;
  avatarUrl: string;
  quote: string;
}

const HOME_TESTIMONIALS_DATA: TestimonialData[] = [
  {
    id: 'testimonial-emma',
    name: 'Emma',
    avatarUrl: '/img/girl.png',
    quote: '“La meva xarxa d’aquesta comunitat ha estat clau: va revolucionar la meva carrera i em va mostrar camins insospitats.”'
  },
  {
    id: 'testimonial-laia',
    name: 'Laia',
    avatarUrl: '/img/girl.png',
    quote: '“IT Alumni em va donar les eines i l’autoestima per fer realitat el meu somni d’emprendre.”'
  },
  {
    id: 'testimonial-marc',
    name: 'Marc',
    avatarUrl: '/img/boy.png',
    quote: '“Gràcies al suport continuat, vaig fer el salt al sector tecnològic amb tota la confiança del món.”'
  }
];


export function createTestimonialCard(index: number): HTMLElement {
  const cardElement = document.createElement('div');
  cardElement.className = 'home-testimonial-card';

  const data = HOME_TESTIMONIALS_DATA[index] || HOME_TESTIMONIALS_DATA[0];

  cardElement.innerHTML = `
    <div class="testimonial-header">
      <div class="testimonial-avatar-circle" style="background-image: url('${data.avatarUrl}'); background-size: cover; background-position: center;"></div>
      <div class="testimonial-meta">
        <h3 class="testimonial-user-name">${data.name}</h3>
        <div class="testimonial-stars">★★★★★</div>
      </div>
    </div>
    <p class="testimonial-quote">${data.quote}</p>
  `;

  return cardElement;
}