-- CreateTable
CREATE TABLE "reports" (
    "id" TEXT NOT NULL,
    "startDate" TIMESTAMP(3) NOT NULL,
    "endDate" TIMESTAMP(3) NOT NULL,
    "totalSales" DOUBLE PRECISION NOT NULL,
    "totalAmount" INTEGER NOT NULL,
    "csvUrl" TEXT NOT NULL,

    CONSTRAINT "reports_pkey" PRIMARY KEY ("id")
);
