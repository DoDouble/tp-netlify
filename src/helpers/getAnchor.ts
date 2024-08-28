// 'use client';

// import { usePathname } from 'next/navigation'

// const getAnchor = () => {
//     // const pathname = usePathname();

//     // console.log('pathname:', pathname);
//     console.log('document.URL:', document.URL);
//     const urlParts = document.URL.split('#');
//     return (urlParts.length > 1) ? urlParts[1] : null;
// };

// export default getAnchor;
"use client"
import { useRouter, useParams } from "next/navigation";
import { useEffect, useState } from "react"

export default function getAnchor() {
    const router = useRouter();
    const params = useParams();

    useEffect(() => {
      console.log("Hash:", window.location.hash);
    }, [params]);

  return 'hello';
}

