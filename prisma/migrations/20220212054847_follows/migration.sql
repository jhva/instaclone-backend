-- CreateTable
CREATE TABLE "_팔로우륄레이션" (
    "A" INTEGER NOT NULL,
    "B" INTEGER NOT NULL
);

-- CreateIndex
CREATE UNIQUE INDEX "_팔로우륄레이션_AB_unique" ON "_팔로우륄레이션"("A", "B");

-- CreateIndex
CREATE INDEX "_팔로우륄레이션_B_index" ON "_팔로우륄레이션"("B");

-- AddForeignKey
ALTER TABLE "_팔로우륄레이션" ADD FOREIGN KEY ("A") REFERENCES "User"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "_팔로우륄레이션" ADD FOREIGN KEY ("B") REFERENCES "User"("id") ON DELETE CASCADE ON UPDATE CASCADE;
