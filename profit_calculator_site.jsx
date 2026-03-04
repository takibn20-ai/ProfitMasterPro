import React, { useState } from "react";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { motion } from "framer-motion";

export default function ProfitCalculator() {
  const [cost, setCost] = useState("");
  const [fees, setFees] = useState("");
  const [price, setPrice] = useState("");
  const [result, setResult] = useState(null);

  const calculate = () => {
    const totalCost = parseFloat(cost || 0) + parseFloat(fees || 0);
    const sellingPrice = parseFloat(price || 0);

    if (!sellingPrice) {
      setResult(null);
      return;
    }

    const profit = sellingPrice - totalCost;
    const margin = ((profit / sellingPrice) * 100).toFixed(2);

    setResult({ profit, margin });
  };

  return (
    <div className="min-h-screen bg-gray-100 flex items-center justify-center p-6">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
        className="w-full max-w-md"
      >
        <Card className="rounded-2xl shadow-xl">
          <CardContent className="p-6 space-y-4">
            <h1 className="text-2xl font-bold text-center">
              حاسبة هامش الربح
            </h1>

            <input
              type="number"
              placeholder="تكلفة المنتج"
              value={cost}
              onChange={(e) => setCost(e.target.value)}
              className="w-full p-3 rounded-xl border"
            />

            <input
              type="number"
              placeholder="الشحن + الرسوم"
              value={fees}
              onChange={(e) => setFees(e.target.value)}
              className="w-full p-3 rounded-xl border"
            />

            <input
              type="number"
              placeholder="سعر البيع"
              value={price}
              onChange={(e) => setPrice(e.target.value)}
              className="w-full p-3 rounded-xl border"
            />

            <Button
              onClick={calculate}
              className="w-full rounded-2xl text-lg"
            >
              احسب الربح
            </Button>

            {result && (
              <div className="mt-4 text-center space-y-2">
                <p className="text-lg font-semibold">
                  الربح الصافي: {result.profit}
                </p>
                <p className="text-lg font-semibold">
                  هامش الربح: {result.margin}%
                </p>
              </div>
            )}
          </CardContent>
        </Card>
      </motion.div>
    </div>
  );
}
