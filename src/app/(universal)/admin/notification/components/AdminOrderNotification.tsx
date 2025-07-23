"use client";

import React, { useEffect, useRef } from "react";
import { db } from "@/lib/firebaseConfig";
import { collection, onSnapshot, orderBy, query } from "firebase/firestore";
import toast from "react-hot-toast";

export default function AdminOrderNotification() {
  const lastOrderTime = useRef<number>(Date.now()); // Track last seen order

  useEffect(() => {
    const q = query(
      collection(db, "orderMaster"),
      orderBy("time", "desc")
    );

    const unsubscribe = onSnapshot(q, (snapshot) => {
      snapshot.docChanges().forEach((change) => {
        if (change.type === "added") {
          const data = change.doc.data();
          const orderTime = new Date(data.time).getTime();

          // Show notification only for new orders
          if (orderTime > lastOrderTime.current) {
            lastOrderTime.current = orderTime;
            toast.success(`New order #${data.srno} received!`);
            // You can also play a sound here if needed
          }
        }
      });
    });

    return () => unsubscribe();
  }, []);

  return null; // Component doesn't render anything, just listens
}
