const env = require('./env');
const { PrismaPg } = require('@prisma/adapter-pg');

let prismaClient = null;
let PrismaClientClass = null;

const loadPrismaClientClass = () => {
	if (PrismaClientClass) {
		return PrismaClientClass;
	}

	try {
		const prismaClientModule = require('@prisma/client');
		PrismaClientClass = prismaClientModule.PrismaClient;
		return PrismaClientClass;
	} catch (error) {
		throw new Error(
			'Prisma packages are not installed yet. Run `npm install` after adding Prisma dependencies.',
			{ cause: error }
		);
	}
};

const getPrismaClient = () => {
	if (!env.DATABASE_URL) {
		throw new Error('DATABASE_URL is required to use Prisma');
	}

	if (!prismaClient) {
		const PrismaClient = loadPrismaClientClass();
		const adapter = new PrismaPg(env.DATABASE_URL);
		prismaClient = new PrismaClient({
			adapter,
			log: env.NODE_ENV === 'development' ? ['warn', 'error'] : ['error'],
		});
	}

	return prismaClient;
};

const connectPrisma = async () => {
	if (!env.DATABASE_URL) {
		console.warn('DATABASE_URL is not set; Prisma initialization skipped');
		return null;
	}

	const prisma = getPrismaClient();
	await prisma.$connect();
	console.log('✓ Prisma client initialized');
	return prisma;
};

const disconnectPrisma = async () => {
	if (prismaClient) {
		await prismaClient.$disconnect();
	}
};

module.exports = {
	getPrismaClient,
	connectPrisma,
	disconnectPrisma,
};