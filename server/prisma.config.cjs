module.exports = {
  datasource: {
    url: process.env.DATABASE_URL || 'postgresql://neondb_owner:npg_lEiUYZ2oy9zp@ep-withered-firefly-am4okr89-pooler.c-5.us-east-1.aws.neon.tech/neondb?sslmode=require&channel_binding=require',
    shadowDatabaseUrl: process.env.DIRECT_URL || 'postgresql://neondb_owner:npg_lEiUYZ2oy9zp@ep-withered-firefly-am4okr89.c-5.us-east-1.aws.neon.tech/neondb?sslmode=require&channel_binding=require',
  },
};
