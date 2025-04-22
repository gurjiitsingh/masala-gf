"use client";

type productTableProps = {
  limit?: number;
  title?: string;
};

import React, { useEffect, useState } from "react";
import {
  Table,
  TableBody,
  //TableCell,
  TableHead,
  TableHeader,
  TableRow,
  //TableCaption,
} from "@/components/ui/table";

//import { Button } from "../ui/button";

import TableRows from "./TableRows";
import { fetchAllUsers } from "@/app/action/user/dbOperation";
import { userType, userTypeArr } from "@/lib/types/userType";
//import FeaturProductUpdate from "./FeaturProductUpdate";

const ListView = ({ title }: productTableProps) => {
  const [userData, setUserData] = useState<userType[]>([]);
  // var pageNo = 1;
  // var limit = 10


  


  useEffect(() => {
    async function fetchUsers() {
      try {
        const result = await fetchAllUsers();
        setUserData(result);
      } catch (error) {
        console.log(error);
      }
    }
    fetchUsers();
  }, []);

  // function handleDelete(id:string){
  //   console.log(id)
  // }
  // Sort posts in dec product based on date

  //   const sortedproducts: TProduct[] = [...products].sort((a, b) => {
  //     return new Date(b.date).getTime() - new Date(a.date).getTime();
  //   });

  
  return (
    <>
      <div className="mt-10 p-2">
        <h3 className="text-2xl mb-4 font-semibold">
          {title ? title : "Products"}
        </h3>
        <div className="bg-slate-50 rounded-lg p-1">
          <Table>
            {/* <TableCaption>Product List</TableCaption> */}
            <TableHeader>
              <TableRow>
                <TableHead className="hidden md:table-cell">User id</TableHead>
                <TableHead className="hidden md:table-cell">
                  User Name
                </TableHead>
                <TableHead className="hidden md:table-cell">Email</TableHead>

                <TableHead>Role</TableHead>
                <TableHead className="hidden md:table-cell">Action</TableHead>
                <TableHead>Time</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {userData.map((user: userType, i) => {
                return <TableRows key={i} user={user} />;
              })}
            </TableBody>
          </Table>
        </div>
      </div>
    </>
  );
};

export default ListView;
