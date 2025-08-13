-- CreateEnum
CREATE TYPE "public"."LearnType" AS ENUM ('reading', 'study', 'review', 'exercise');

-- CreateTable
CREATE TABLE "public"."users" (
    "id" SERIAL NOT NULL,
    "name" VARCHAR(70) NOT NULL,
    "email" VARCHAR(70) NOT NULL,
    "password" VARCHAR(140) NOT NULL,
    "created_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "users_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "public"."avarages" (
    "months" INTEGER NOT NULL,
    "weeks" INTEGER NOT NULL,
    "days" INTEGER NOT NULL,
    "total" INTEGER NOT NULL,
    "userId" INTEGER NOT NULL
);

-- CreateTable
CREATE TABLE "public"."subjects" (
    "id" SERIAL NOT NULL,
    "name" VARCHAR(150) NOT NULL,
    "total_time" INTEGER NOT NULL,
    "avarage" INTEGER NOT NULL,
    "created_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "userId" INTEGER NOT NULL,

    CONSTRAINT "subjects_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "public"."contexts" (
    "id" SERIAL NOT NULL,
    "total_time" INTEGER NOT NULL,
    "name" VARCHAR(150) NOT NULL,
    "created_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "contexts_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "public"."reviews" (
    "id" SERIAL NOT NULL,
    "date" TIMESTAMPTZ(6) NOT NULL,
    "done" BOOLEAN NOT NULL,
    "position" SMALLINT NOT NULL,
    "created_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "reviews_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "public"."learns" (
    "id" SERIAL NOT NULL,
    "content" VARCHAR(150) NOT NULL,
    "start" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "end" TIMESTAMP(3) NOT NULL,
    "type" "public"."LearnType" NOT NULL,
    "created_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "subjectId" INTEGER,

    CONSTRAINT "learns_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "public"."days" (
    "id" SERIAL NOT NULL,
    "date" TIMESTAMPTZ(6) NOT NULL,
    "total_time" INTEGER NOT NULL,
    "userId" INTEGER,

    CONSTRAINT "days_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "public"."weeks" (
    "id" SERIAL NOT NULL,
    "sunday" DATE NOT NULL,
    "average_all_days" INTEGER NOT NULL,
    "average_days_studied" INTEGER NOT NULL,
    "total_time" INTEGER NOT NULL,
    "created_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "userId" INTEGER,

    CONSTRAINT "weeks_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "public"."months" (
    "id" SERIAL NOT NULL,
    "firstDay" DATE NOT NULL,
    "average_all_days" INTEGER NOT NULL,
    "average_days_studied" INTEGER NOT NULL,
    "total_time" INTEGER NOT NULL,
    "created_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "userId" INTEGER,

    CONSTRAINT "months_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "public"."_ContextToSubject" (
    "A" INTEGER NOT NULL,
    "B" INTEGER NOT NULL,

    CONSTRAINT "_ContextToSubject_AB_pkey" PRIMARY KEY ("A","B")
);

-- CreateTable
CREATE TABLE "public"."_ReviewToSubject" (
    "A" INTEGER NOT NULL,
    "B" INTEGER NOT NULL,

    CONSTRAINT "_ReviewToSubject_AB_pkey" PRIMARY KEY ("A","B")
);

-- CreateIndex
CREATE UNIQUE INDEX "users_email_key" ON "public"."users"("email");

-- CreateIndex
CREATE UNIQUE INDEX "avarages_userId_key" ON "public"."avarages"("userId");

-- CreateIndex
CREATE INDEX "avarages_userId_idx" ON "public"."avarages"("userId");

-- CreateIndex
CREATE INDEX "subjects_name_idx" ON "public"."subjects"("name");

-- CreateIndex
CREATE INDEX "contexts_name_idx" ON "public"."contexts"("name");

-- CreateIndex
CREATE INDEX "reviews_date_idx" ON "public"."reviews"("date");

-- CreateIndex
CREATE INDEX "learns_content_type_idx" ON "public"."learns"("content", "type");

-- CreateIndex
CREATE INDEX "days_date_idx" ON "public"."days"("date");

-- CreateIndex
CREATE INDEX "weeks_sunday_idx" ON "public"."weeks"("sunday");

-- CreateIndex
CREATE INDEX "months_firstDay_idx" ON "public"."months"("firstDay");

-- CreateIndex
CREATE INDEX "_ContextToSubject_B_index" ON "public"."_ContextToSubject"("B");

-- CreateIndex
CREATE INDEX "_ReviewToSubject_B_index" ON "public"."_ReviewToSubject"("B");

-- AddForeignKey
ALTER TABLE "public"."avarages" ADD CONSTRAINT "avarages_userId_fkey" FOREIGN KEY ("userId") REFERENCES "public"."users"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "public"."subjects" ADD CONSTRAINT "subjects_userId_fkey" FOREIGN KEY ("userId") REFERENCES "public"."users"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "public"."learns" ADD CONSTRAINT "learns_subjectId_fkey" FOREIGN KEY ("subjectId") REFERENCES "public"."subjects"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "public"."days" ADD CONSTRAINT "days_userId_fkey" FOREIGN KEY ("userId") REFERENCES "public"."users"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "public"."weeks" ADD CONSTRAINT "weeks_userId_fkey" FOREIGN KEY ("userId") REFERENCES "public"."users"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "public"."months" ADD CONSTRAINT "months_userId_fkey" FOREIGN KEY ("userId") REFERENCES "public"."users"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "public"."_ContextToSubject" ADD CONSTRAINT "_ContextToSubject_A_fkey" FOREIGN KEY ("A") REFERENCES "public"."contexts"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "public"."_ContextToSubject" ADD CONSTRAINT "_ContextToSubject_B_fkey" FOREIGN KEY ("B") REFERENCES "public"."subjects"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "public"."_ReviewToSubject" ADD CONSTRAINT "_ReviewToSubject_A_fkey" FOREIGN KEY ("A") REFERENCES "public"."reviews"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "public"."_ReviewToSubject" ADD CONSTRAINT "_ReviewToSubject_B_fkey" FOREIGN KEY ("B") REFERENCES "public"."subjects"("id") ON DELETE CASCADE ON UPDATE CASCADE;
