-- CreateTable
CREATE TABLE "metrics" (
    "id" TEXT NOT NULL DEFAULT fn_uuid_time_ordered(),
    "page" VARCHAR(60) NOT NULL,
    "ip" VARCHAR(60),
    "useragent" JSONB,
    "created_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "metrics_pkey" PRIMARY KEY ("id")
);
