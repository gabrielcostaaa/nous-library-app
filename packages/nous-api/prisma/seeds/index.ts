import { PrismaClient, Role } from '@prisma/client';
import * as bcrypt from 'bcryptjs';

const prisma = new PrismaClient();

async function main() {
  await prisma.$transaction(async (tx) => {
    await tx.loan.deleteMany();
    await tx.book.deleteMany();
    await tx.user.deleteMany();
  });

  const adminPassword = process.env.SEED_ADMIN_PASSWORD || 'Admin@123';
  const userPassword = process.env.SEED_USER_PASSWORD || 'User@123';

  const [adminHash, userHash] = await Promise.all([
    bcrypt.hash(adminPassword, 10),
    bcrypt.hash(userPassword, 10),
  ]);

  await prisma.user.createMany({
    data: [
      {
        name: 'Nous Admin',
        email: 'admin@nous.com',
        password: adminHash,
        role: Role.ADMIN,
      },
      {
        name: 'Nous User',
        email: 'user@nous.com',
        password: userHash,
        role: Role.USER,
      },
    ],
  });

  const base = process.env.LOCAL_PUBLIC_BASE_URL || 'http://localhost:3000/static';
  await prisma.book.createMany({
    data: [
      { title: 'O Alquimista', author: 'Paulo Coelho', genre: 'Ficção', basePrice: 35.0, imageUrl: `${base}/books/o-alquimista.jpg` },
      { title: 'Dom Casmurro', author: 'Machado de Assis', genre: 'Clássico', basePrice: 25.0, imageUrl: `${base}/books/dom-casmurro.jpg` },
      { title: 'A Hora da Estrela', author: 'Clarice Lispector', genre: 'Ficção', basePrice: 32.0, imageUrl: `${base}/books/a-hora-da-estrela.jpg` },
      { title: 'Torto Arado', author: 'Itamar Vieira Junior', genre: 'Ficção', basePrice: 45.0, imageUrl: `${base}/books/torto-arado.jpg` },
      { title: 'Vidas Secas', author: 'Graciliano Ramos', genre: 'Romance', basePrice: 28.0, imageUrl: `${base}/books/vidas-secas.jpg` },
      { title: 'Memórias Póstumas de Brás Cubas', author: 'Machado de Assis', genre: 'Clássico', basePrice: 27.5, imageUrl: `${base}/books/memorias-postumas-de-bras-cubas.jpg` },
      { title: 'Ideias para Adiar o Fim do Mundo', author: 'Ailton Krenak', genre: 'Ensaio', basePrice: 30.0, imageUrl: `${base}/books/ideias-para-adiar-o-fim-do-mundo.jpg` },
      { title: 'O Cortiço', author: 'Aluísio Azevedo', genre: 'Romance', basePrice: 26.5, imageUrl: `${base}/books/o-cortico.jpg` },
      { title: 'Tudo é Rio', author: 'Carla Madeira', genre: 'Ficção', basePrice: 40.0, imageUrl: `${base}/books/tudo-e-rio.jpg` },
      { title: 'Grande Sertão: Veredas', author: 'João Guimarães Rosa', genre: 'Romance', basePrice: 42.0, imageUrl: `${base}/books/grande-sertao-veredas.jpg` },
    ],
  });

  console.log('✅ Seed finalizado: base zerada, admin, user e 10 livros brasileiros criados.');
}

main()
  .catch((e) => {
    console.error('❌ Seed falhou:', e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
