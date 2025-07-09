const { createEmailHTML } = require('./services/emailService');
const fs = require('fs');

const sampleArticleData = {
  title: '🌙 **Nuevo parque de diversiones en la Luna**',
  article: `¡Atención, viajeros del espacio! Se acaba de inaugurar el primer parque de diversiones en la Luna. ¡Es una noticia increíble! En este parque, los turistas pueden experimentar la gravedad lunar y hacer cosas especiales y probar la comida espacial.\n\nEl parque cuenta con atracciones emocionantes como la montaña rusa lunar y la nave espacial gigante. También hay un hotel con habitaciones que tienen vistas espectaculares del espacio. ¡Qué aventura tan emocionante!\n\nLos boletos para visitar el parque ya están a la venta en la Tierra. Muchas personas están emocionadas con la oportunidad de viajar a la Luna y vivir esta experiencia única. ¡No te pierdas la oportunidad de ser uno de los primeros en visitar este increíble parque de diversiones espacial!`,
  concepts: `1. Inaugurar - To inaugurate\nExample: El alcalde inauguró la nueva biblioteca municipal esta tarde.\n\n2. Turistas - Tourists\nExample: Los turistas visitan la catedral famosa en el centro de la ciudad.\n\n3. Atracciones - Attractions\nExample: El parque de diversiones tiene muchas atracciones divertidas para los niños.\n\n4. Están a la venta - Are for sale\nExample: Los boletos para el concierto de la banda famosa están a la venta en línea.`,
  topic: 'Viajes y turismo',
  date: 'miércoles, 9 de julio de 2025'
};

const html = createEmailHTML(sampleArticleData);
fs.writeFileSync('preview.html', html, 'utf8');
console.log('✅ Preview email saved as preview.html'); 