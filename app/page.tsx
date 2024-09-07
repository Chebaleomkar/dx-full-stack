import Link from "next/link";
import { FaSchool, FaUserTie, FaBullseye, FaEnvelope } from "react-icons/fa";
import HomeCard from "@/components/HomeCard";


export default function HomePage() {
  return (
    <>
      <div className="min-h-screen flex flex-col ">
        <div
          className="bg mt-20 flex items-center rounded-2xl  justify-center h-[35rem] p-5 max-sm:h-[20rem] max-sm:mt-36 max-sm:m-2 max-sm:rounded-3xl"
        >
          <svg
            viewBox="0 0 350.00000000000006 89.68674175995592"
            className="h-40 max-sm:h-20 "
          >
            <defs id="SvgjsDefs1011"></defs>
            <g
              id="SvgjsG1012"
              transform="matrix(5.225877681618251,0,0,5.225877681618251,0.6270967029604426,-43.16575583006056)"
              fill="#111111"
            >
              <path d="M6.52 15.780000000000001 l0 -1.09 t0.03 -1.35 t0.1 -1.36 t0.19 -1.14 q0.1 -0.2 0.36 -0.16 t0.52 0.22 t0.46 0.41 t0.2 0.37 q0 0.58 -0.08 1.22 t-0.08 1.14 q-0.04 0.54 -0.05 1.11 t-0.06 1.14 t-0.17 1.11 t-0.38 1 q-0.04 0.08 -0.11 0.2 t-0.16 0.23 t-0.19 0.19 t-0.18 0.08 q-0.16 0 -0.25 -0.33 t-0.12 -0.83 t-0.03 -1.08 l0 -1.08 z M7.88 10.02 q-0.8 0 -1.56 0.14 t-1.51 0.36 t-1.52 0.53 t-1.59 0.63 q-0.06 0.04 -0.21 0.09 t-0.3 0.08 t-0.27 -0.02 t-0.12 -0.23 t0.11 -0.36 t0.21 -0.28 q0.58 -0.76 1.39 -1.28 t1.73 -0.83 t1.89 -0.45 t1.87 -0.14 q1.58 0 3.14 0.43 t2.81 1.25 t2.03 2.01 t0.78 2.69 q0 1.08 -0.4 1.96 t-1.07 1.58 t-1.56 1.2 t-1.87 0.84 t-2 0.5 t-1.94 0.16 q-1.84 0 -3.62 -0.43 t-3.34 -1.29 l0.02 0 q-0.16 -0.08 -0.35 -0.2 t-0.36 -0.25 t-0.28 -0.25 t-0.11 -0.22 t0.12 -0.1 t0.28 0.04 t0.32 0.11 t0.24 0.09 q1.56 0.5 3.11 0.78 t3.25 0.3 q0.64 0 1.49 -0.1 t1.73 -0.33 t1.73 -0.6 t1.52 -0.92 t1.08 -1.28 t0.41 -1.67 q0 -0.88 -0.39 -1.57 t-1.02 -1.19 t-1.42 -0.84 t-1.6 -0.55 t-1.56 -0.3 t-1.29 -0.09 z M17.82 15.84 q0 -0.48 0.25 -0.66 t0.55 -0.14 t0.52 0.26 t0.16 0.54 q-0.08 0.36 -0.15 0.9 t-0.09 1.04 t0.03 0.86 t0.23 0.36 q0.12 0 0.29 -0.31 t0.33 -0.73 t0.3 -0.84 t0.18 -0.64 q0.06 -0.2 0.2 -0.27 t0.27 -0.04 t0.22 0.15 t0.03 0.3 q-0.04 0.12 -0.13 0.45 t-0.23 0.73 t-0.33 0.83 t-0.44 0.76 t-0.55 0.51 t-0.66 0.08 q-0.54 -0.16 -0.77 -0.59 t-0.27 -1 t0.01 -1.24 t0.05 -1.31 z M20.1 13.1 q0.04 0.22 -0.05 0.41 t-0.27 0.34 t-0.42 0.25 t-0.5 0.14 q-0.5 0.06 -0.98 -0.1 t-0.54 -0.58 q-0.08 -0.44 0.27 -0.75 t0.93 -0.41 t1.04 0.09 t0.52 0.61 z M23.48 14.76 q0.26 -0.14 0.52 0 t0.4 0.39 t0.09 0.52 t-0.41 0.37 q-0.32 0.08 -0.67 0.16 t-0.66 0.14 t-0.53 0.11 t-0.28 0.05 q0.04 0 0.43 0.11 t0.83 0.36 t0.8 0.67 t0.36 1.06 q0 0.7 -0.48 1.11 t-1.12 0.55 q-0.4 0.06 -0.77 0 t-0.66 -0.25 t-0.47 -0.52 t-0.18 -0.79 q0 -0.38 0.25 -0.6 t0.54 -0.28 t0.52 0.06 t0.19 0.42 q-0.1 0.62 0.06 0.9 t0.32 0.28 q0.2 0 0.33 -0.14 t0.15 -0.37 t-0.08 -0.52 t-0.32 -0.59 q-0.18 -0.26 -0.45 -0.47 t-0.54 -0.36 t-0.53 -0.24 t-0.42 -0.13 q-0.18 -0.04 -0.27 -0.25 t-0.08 -0.44 t0.16 -0.42 t0.45 -0.19 q0.6 0 1.29 -0.19 t1.23 -0.51 z M28.28 16.56 q-0.04 0.4 -0.25 0.65 t-0.44 0.34 t-0.4 0.03 t-0.13 -0.3 q0.02 -0.16 0.08 -0.52 t0.09 -0.73 t0.02 -0.64 t-0.13 -0.25 t-0.27 0.3 t-0.27 0.7 t-0.21 0.91 t-0.09 0.93 t0.11 0.76 t0.39 0.4 q0.48 0.14 0.89 -0.19 t0.73 -0.81 t0.54 -0.97 t0.28 -0.69 q0.06 -0.18 0.19 -0.24 t0.25 -0.04 t0.2 0.13 t0.04 0.29 q-0.04 0.12 -0.14 0.44 t-0.28 0.71 t-0.44 0.81 t-0.61 0.76 t-0.8 0.55 t-1.01 0.19 q-0.72 -0.04 -1.12 -0.48 t-0.54 -1.08 t-0.04 -1.37 t0.37 -1.36 t0.67 -1.05 t0.9 -0.42 q0.76 0 1.13 0.67 t0.29 1.57 z M29.240000000000002 15.84 q0 -0.48 0.25 -0.66 t0.55 -0.14 t0.52 0.26 t0.16 0.54 q-0.08 0.36 -0.15 0.9 t-0.09 1.04 t0.03 0.86 t0.23 0.36 q0.12 0 0.29 -0.31 t0.33 -0.73 t0.3 -0.84 t0.18 -0.64 q0.06 -0.2 0.2 -0.27 t0.27 -0.04 t0.22 0.15 t0.03 0.3 q-0.04 0.12 -0.13 0.45 t-0.23 0.73 t-0.33 0.83 t-0.44 0.76 t-0.55 0.51 t-0.66 0.08 q-0.54 -0.16 -0.77 -0.59 t-0.27 -1 t0.01 -1.24 t0.05 -1.31 z M31.520000000000003 13.1 q0.04 0.22 -0.05 0.41 t-0.27 0.34 t-0.42 0.25 t-0.5 0.14 q-0.5 0.06 -0.98 -0.1 t-0.54 -0.58 q-0.08 -0.44 0.27 -0.75 t0.93 -0.41 t1.04 0.09 t0.52 0.61 z M31.880000000000003 14.2 q0 -0.38 0.26 -0.62 t0.56 -0.33 t0.53 -0.02 t0.19 0.33 q-0.04 0.22 -0.07 0.58 t-0.07 0.82 q0.2 -0.2 0.51 -0.36 t0.67 -0.14 q0.62 0.04 0.97 0.46 t0.49 1 t0.06 1.24 t-0.34 1.22 t-0.67 0.91 t-0.95 0.31 q-0.36 0 -0.72 -0.24 l-0.12 -0.08 t-0.12 -0.1 q-0.04 0.78 -0.05 1.45 t-0.01 1.07 q0 0.22 -0.23 0.34 t-0.49 0.13 t-0.48 -0.1 t-0.18 -0.35 q0.04 -0.4 0.08 -1.06 t0.07 -1.44 t0.05 -1.6 t0.03 -1.52 t0.02 -1.21 t0.01 -0.69 z M33.480000000000004 15.879999999999999 q-0.18 0.42 -0.25 0.9 t-0.03 0.9 t0.2 0.72 t0.4 0.34 q0.2 0.04 0.37 -0.2 t0.28 -0.61 t0.17 -0.82 t0.03 -0.85 t-0.14 -0.67 t-0.33 -0.29 t-0.4 0.16 t-0.3 0.42 z M36.82000000000001 11.64 q0 -0.48 0.26 -0.67 t0.57 -0.17 t0.54 0.22 t0.17 0.52 q-0.04 0.24 -0.13 0.94 t-0.17 1.61 t-0.14 1.89 t-0.07 1.81 t0.06 1.36 t0.27 0.53 q0.12 0 0.33 -0.44 t0.42 -1 t0.39 -1.09 t0.24 -0.69 q0.04 -0.18 0.18 -0.24 t0.27 -0.03 t0.22 0.14 t0.03 0.29 q-0.12 0.4 -0.32 1.12 t-0.5 1.42 t-0.72 1.22 t-1 0.52 q-0.54 0 -0.81 -0.57 t-0.37 -1.45 t-0.07 -1.96 t0.11 -2.11 t0.16 -1.88 t0.08 -1.29 z M39.580000000000005 15.84 q0 -0.48 0.25 -0.66 t0.55 -0.14 t0.52 0.26 t0.16 0.54 q-0.08 0.36 -0.15 0.9 t-0.09 1.04 t0.03 0.86 t0.23 0.36 q0.12 0 0.29 -0.31 t0.33 -0.73 t0.3 -0.84 t0.18 -0.64 q0.06 -0.2 0.2 -0.27 t0.27 -0.04 t0.22 0.15 t0.03 0.3 q-0.04 0.12 -0.13 0.45 t-0.23 0.73 t-0.33 0.83 t-0.44 0.76 t-0.55 0.51 t-0.66 0.08 q-0.54 -0.16 -0.77 -0.59 t-0.27 -1 t0.01 -1.24 t0.05 -1.31 z M41.86 13.1 q0.04 0.22 -0.05 0.41 t-0.27 0.34 t-0.42 0.25 t-0.5 0.14 q-0.5 0.06 -0.98 -0.1 t-0.54 -0.58 q-0.08 -0.44 0.27 -0.75 t0.93 -0.41 t1.04 0.09 t0.52 0.61 z M42.26 15.52 q0.06 -0.4 0.34 -0.6 t0.57 -0.22 t0.51 0.12 t0.18 0.44 q-0.04 0.28 -0.11 0.63 t-0.13 0.7 t-0.09 0.66 t-0.01 0.51 q0.16 -0.54 0.37 -0.97 t0.43 -0.73 q0.16 -0.2 0.44 -0.31 t0.54 -0.1 t0.42 0.15 t0.06 0.4 q-0.06 0.18 -0.11 0.56 t-0.05 0.77 t0.04 0.68 t0.14 0.29 q0.12 0 0.32 -0.22 t0.4 -0.53 t0.37 -0.66 t0.25 -0.61 q0.04 -0.18 0.17 -0.24 t0.25 -0.04 t0.2 0.13 t0.04 0.29 q-0.06 0.28 -0.28 0.76 t-0.52 0.94 t-0.66 0.81 t-0.7 0.35 q-0.58 0 -0.83 -0.31 t-0.33 -0.7 t-0.06 -0.76 t-0.02 -0.47 q-0.1 0.04 -0.21 0.28 t-0.21 0.56 t-0.18 0.67 t-0.1 0.59 q-0.04 0.26 -0.27 0.39 t-0.5 0.13 t-0.49 -0.14 t-0.2 -0.44 q0.02 -0.34 0 -0.82 t-0.04 -1.01 t-0.02 -1.03 t0.08 -0.9 z M50.46 16.5 q-0.16 0.22 -0.4 0.36 t-0.52 0.23 t-0.57 0.13 t-0.51 0.06 q-0.06 0.42 -0.07 0.82 t0.04 0.72 t0.16 0.54 t0.31 0.28 q0.26 0.08 0.56 -0.09 t0.58 -0.47 t0.54 -0.7 t0.46 -0.77 t0.34 -0.68 t0.18 -0.45 q0.06 -0.18 0.19 -0.24 t0.25 -0.04 t0.2 0.13 t0.04 0.29 q-0.04 0.12 -0.14 0.47 t-0.29 0.79 t-0.46 0.91 t-0.65 0.86 t-0.87 0.65 t-1.09 0.26 q-0.72 0 -1.12 -0.5 t-0.54 -1.26 t-0.05 -1.63 t0.36 -1.63 t0.68 -1.26 t0.91 -0.5 q0.48 0 0.85 0.33 t0.57 0.77 t0.23 0.9 t-0.17 0.72 z M49.22 14.719999999999999 q-0.14 0.06 -0.3 0.51 t-0.3 1.09 q0.22 0 0.44 -0.05 t0.32 -0.21 q0.08 -0.12 0.1 -0.35 t-0.01 -0.47 t-0.1 -0.4 t-0.15 -0.12 z M63.980000000000004 9.44 q0.4 -0.28 0.86 -0.53 t0.98 -0.25 q0.22 0 0.29 0.05 t0.07 0.15 q0 0.12 -0.11 0.26 t-0.24 0.29 t-0.26 0.26 t-0.19 0.17 q-1.4 1.16 -2.87 2.39 t-2.87 2.43 q1.12 1.18 2.18 2.24 t1.99 2.02 t1.71 1.8 t1.32 1.56 q0.06 0.08 -0.13 0.25 t-0.41 0.17 q-0.28 0 -0.79 -0.35 t-1.17 -0.92 t-1.43 -1.3 t-1.57 -1.49 t-1.59 -1.5 t-1.49 -1.32 q-0.58 0.46 -1.15 0.91 t-1.18 0.95 t-1.25 1.09 t-1.32 1.33 q-0.1 0.1 -0.21 0.27 t-0.26 0.33 t-0.31 0.27 t-0.34 0.11 t-0.18 -0.26 q0 -0.42 0.37 -0.95 t1.07 -1.22 t1.69 -1.56 t2.23 -1.95 q-1.16 -0.96 -2.19 -2.02 t-2.07 -2.2 q-0.28 -0.32 -0.6 -0.79 t-0.32 -0.97 q0 -0.24 0.2 -0.52 t0.42 -0.28 t0.55 0.23 t0.68 0.55 t0.69 0.66 t0.58 0.56 q1.06 1.06 1.84 1.91 t1.6 1.63 q1.24 -1.12 2.53 -2.3 t2.65 -2.16 z"></path>
            </g>
            <g
              id="SvgjsG1013"
              transform="matrix(0.27375829745101254,0,0,0.27375829745101254,34.78099317928581,83.42315240510013)"
              fill="#111111"
            >
              <path d="M10.6 6 l0 2.42 l-3.6 0 l0 11.58 l-2.62 0 l0 -11.58 l-3.58 0 l0 -2.42 l9.8 0 z M37.28 20 l-2.78 0 l-3.12 -4.76 l-0.12 0 l-2.2 0 l0 4.76 l-2.62 0 l0 -14 l4.82 0 c3.14 0 5.12 1.92 5.12 4.7 c0 1.94 -0.96 3.38 -2.6 4.08 z M29.060000000000002 8.42 l0 4.56 l2.06 0 c1.58 0 2.64 -0.68 2.64 -2.28 c0 -1.58 -1.06 -2.28 -2.64 -2.28 l-2.06 0 z M64.14 20 l-1.16 -2.7 l-6.92 0 l-1.16 2.7 l-2.78 0 l6.24 -14 l2.34 0 l6.22 14 l-2.78 0 z M56.98 15.16 l5.08 0 l-2.54 -5.92 z M91.66 6 l2.62 0 l0 14 l-2 0 l-7.3 -9.22 l0 9.22 l-2.62 0 l0 -14 l2.02 0 l7.28 9.24 l0 -9.24 z M115.03999999999999 5.76 c2.38 0 3.96 1.52 4.66 2.9 l-1.94 1.14 c-0.74 -1.1 -1.54 -1.72 -2.72 -1.72 c-1.12 0 -1.92 0.66 -1.92 1.56 c0 0.86 0.52 1.36 1.72 1.8 l0.96 0.36 c2.98 1.06 4.28 2.36 4.28 4.36 c0 2.72 -2.58 4.14 -4.96 4.14 c-2.5 0 -4.46 -1.48 -5.1 -3.44 l2.02 -1.06 c0.5 1.12 1.44 2.12 3.08 2.12 c1.24 0 2.24 -0.6 2.24 -1.72 c0 -1.14 -0.72 -1.64 -2.28 -2.22 l-0.9 -0.32 c-2.08 -0.76 -3.66 -1.8 -3.66 -4.12 c0 -2.2 2.02 -3.78 4.52 -3.78 z M144.54 8.38 l-6.02 0 l0 3.46 l4.96 0 l0 2.24 l-4.96 0 l0 5.92 l-2.7 0 l0 -14 l8.72 0 l0 2.38 z M166.82 5.800000000000001 c3.84 0 7.24 2.96 7.24 7.2 s-3.4 7.2 -7.24 7.2 s-7.24 -2.96 -7.24 -7.2 s3.4 -7.2 7.24 -7.2 z M166.82 17.740000000000002 c2.44 0 4.5 -1.98 4.5 -4.74 s-2.06 -4.74 -4.5 -4.74 c-2.46 0 -4.52 1.98 -4.52 4.74 s2.06 4.74 4.52 4.74 z M200.84 20 l-2.78 0 l-3.12 -4.76 l-0.12 0 l-2.2 0 l0 4.76 l-2.62 0 l0 -14 l4.82 0 c3.14 0 5.12 1.92 5.12 4.7 c0 1.94 -0.96 3.38 -2.6 4.08 z M192.62 8.42 l0 4.56 l2.06 0 c1.58 0 2.64 -0.68 2.64 -2.28 c0 -1.58 -1.06 -2.28 -2.64 -2.28 l-2.06 0 z M231.38 6 l0 14 l-2.7 0 l0 -8.12 l-3.64 8.12 l-2.24 0 l-3.62 -8.08 l0 8.08 l-2.7 0 l0 -14 l2.6 0 l4.86 10.48 l4.84 -10.48 l2.6 0 z M250.24 6 l0 14 l-2.62 0 l0 -14 l2.62 0 z M275.78000000000003 6 l2.62 0 l0 14 l-2 0 l-7.3 -9.22 l0 9.22 l-2.62 0 l0 -14 l2.02 0 l7.28 9.24 l0 -9.24 z M307.84000000000003 12.64 c0.54 4.66 -2.52 7.56 -6.26 7.56 c-3.92 0 -7.24 -2.96 -7.24 -7.2 s3.4 -7.2 7.24 -7.2 c1.82 0 3.46 0.6 4.68 1.66 l-1.58 1.8 c-0.8 -0.6 -1.86 -1 -2.94 -1 c-2.62 0 -4.68 1.98 -4.68 4.74 s2 4.74 4.52 4.74 c2 0 3.42 -0.8 3.84 -2.86 l-3.48 0 l0 -2.24 l5.9 0 z M351.14000000000004 12.26 c1.58 0.4 2.94 1.76 2.94 3.66 c0 2.54 -1.6 4.08 -5.1 4.08 l-5.32 0 l0 -14 l5.1 0 c2.88 0 4.32 1.62 4.32 3.48 c0 1.46 -0.92 2.36 -1.94 2.78 z M348.54 8.3 l-2.26 0 l0 3.18 l2.26 0 c1.32 0 1.94 -0.66 1.94 -1.6 c0 -1 -0.66 -1.58 -1.94 -1.58 z M348.86 17.7 c1.78 0 2.6 -0.74 2.6 -2.08 c0 -1.16 -0.82 -2.02 -2.68 -2.02 l-2.5 0 l0 4.1 l2.58 0 z M372.44000000000005 17.58 l6.1 0 l0 2.42 l-6.5 0 l-2.22 0 l0 -14 l2.62 0 l5.92 0 l0 2.42 l-5.92 0 l0 3.36 l4.5 0 l0 2.36 l-4.5 0 l0 3.44 z M403.1000000000001 6 l2.62 0 l0 14 l-2.62 0 l0 -5.76 l-6 0 l0 5.76 l-2.62 0 l0 -14 l2.62 0 l0 5.82 l6 0 l0 -5.82 z M433.1800000000001 20 l-1.16 -2.7 l-6.92 0 l-1.16 2.7 l-2.78 0 l6.24 -14 l2.34 0 l6.22 14 l-2.78 0 z M426.0200000000001 15.16 l5.08 0 l-2.54 -5.92 z M462.6200000000001 6 l2.78 0 l-6.22 14 l-2.34 0 l-6.24 -14 l2.78 0 l4.62 10.76 z M483.4600000000001 6 l0 14 l-2.62 0 l0 -14 l2.62 0 z M506.6400000000001 5.800000000000001 c3.84 0 7.24 2.96 7.24 7.2 s-3.4 7.2 -7.24 7.2 s-7.24 -2.96 -7.24 -7.2 s3.4 -7.2 7.24 -7.2 z M506.6400000000001 17.740000000000002 c2.44 0 4.5 -1.98 4.5 -4.74 s-2.06 -4.74 -4.5 -4.74 c-2.46 0 -4.52 1.98 -4.52 4.74 s2.06 4.74 4.52 4.74 z M540.6600000000001 20 l-2.78 0 l-3.12 -4.76 l-0.12 0 l-2.2 0 l0 4.76 l-2.62 0 l0 -14 l4.82 0 c3.14 0 5.12 1.92 5.12 4.7 c0 1.94 -0.96 3.38 -2.6 4.08 z M532.4400000000002 8.42 l0 4.56 l2.06 0 c1.58 0 2.64 -0.68 2.64 -2.28 c0 -1.58 -1.06 -2.28 -2.64 -2.28 l-2.06 0 z M555.1000000000001 22.88 l1.8 -5.14 l2.2 0 l-1.78 5.14 l-2.22 0 z M604.9200000000002 20 l-2.78 0 l-3.12 -4.76 l-0.12 0 l-2.2 0 l0 4.76 l-2.62 0 l0 -14 l4.82 0 c3.14 0 5.12 1.92 5.12 4.7 c0 1.94 -0.96 3.38 -2.6 4.08 z M596.7000000000003 8.42 l0 4.56 l2.06 0 c1.58 0 2.64 -0.68 2.64 -2.28 c0 -1.58 -1.06 -2.28 -2.64 -2.28 l-2.06 0 z M623.1800000000003 17.58 l6.1 0 l0 2.42 l-6.5 0 l-2.22 0 l0 -14 l2.62 0 l5.92 0 l0 2.42 l-5.92 0 l0 3.36 l4.5 0 l0 2.36 l-4.5 0 l0 3.44 z M664.3200000000002 6 l-4.58 14 l-1.86 0 l-3.42 -9.34 l-3.4 9.34 l-1.86 0 l-4.58 -14 l2.76 0 l2.86 8.84 l3.22 -8.84 l2.02 0 l3.22 8.84 l2.86 -8.84 l2.76 0 z M688.5000000000002 20 l-1.16 -2.7 l-6.92 0 l-1.16 2.7 l-2.78 0 l6.24 -14 l2.34 0 l6.22 14 l-2.78 0 z M681.3400000000003 15.16 l5.08 0 l-2.54 -5.92 z M717.5600000000002 20 l-2.78 0 l-3.12 -4.76 l-0.12 0 l-2.2 0 l0 4.76 l-2.62 0 l0 -14 l4.82 0 c3.14 0 5.12 1.92 5.12 4.7 c0 1.94 -0.96 3.38 -2.6 4.08 z M709.3400000000003 8.42 l0 4.56 l2.06 0 c1.58 0 2.64 -0.68 2.64 -2.28 c0 -1.58 -1.06 -2.28 -2.64 -2.28 l-2.06 0 z M738.0000000000002 6 c4 0 7.08 3.1 7.08 6.94 c0 3.96 -3.08 7.06 -7.08 7.06 l-4.8 0 l0 -14 l4.8 0 z M737.9800000000002 17.52 c2.84 0 4.44 -2.06 4.44 -4.58 c0 -2.4 -1.6 -4.46 -4.44 -4.46 l-2.16 0 l0 9.04 l2.16 0 z M763.5400000000003 6 l0 14 l-2.62 0 l0 -14 l2.62 0 z M789.0800000000003 6 l2.62 0 l0 14 l-2 0 l-7.3 -9.22 l0 9.22 l-2.62 0 l0 -14 l2.02 0 l7.28 9.24 l0 -9.24 z M821.1400000000002 12.64 c0.54 4.66 -2.52 7.56 -6.26 7.56 c-3.92 0 -7.24 -2.96 -7.24 -7.2 s3.4 -7.2 7.24 -7.2 c1.82 0 3.46 0.6 4.68 1.66 l-1.58 1.8 c-0.8 -0.6 -1.86 -1 -2.94 -1 c-2.62 0 -4.68 1.98 -4.68 4.74 s2 4.74 4.52 4.74 c2 0 3.42 -0.8 3.84 -2.86 l-3.48 0 l0 -2.24 l5.9 0 z M861.4800000000002 5.76 c2.38 0 3.96 1.52 4.66 2.9 l-1.94 1.14 c-0.74 -1.1 -1.54 -1.72 -2.72 -1.72 c-1.12 0 -1.92 0.66 -1.92 1.56 c0 0.86 0.52 1.36 1.72 1.8 l0.96 0.36 c2.98 1.06 4.28 2.36 4.28 4.36 c0 2.72 -2.58 4.14 -4.96 4.14 c-2.5 0 -4.46 -1.48 -5.1 -3.44 l2.02 -1.06 c0.5 1.12 1.44 2.12 3.08 2.12 c1.24 0 2.24 -0.6 2.24 -1.72 c0 -1.14 -0.72 -1.64 -2.28 -2.22 l-0.9 -0.32 c-2.08 -0.76 -3.66 -1.8 -3.66 -4.12 c0 -2.2 2.02 -3.78 4.52 -3.78 z M890.3000000000002 6 l2.62 0 l0 8.92 c0 3.4 -2.42 5.38 -5.32 5.38 c-2.92 0 -5.34 -1.98 -5.34 -5.38 l0 -8.92 l2.62 0 l0 8.92 c0 2.2 1.4 2.92 2.72 2.92 s2.7 -0.72 2.7 -2.92 l0 -8.92 z M920.8800000000001 18.5 c-1.26 1.1 -2.9 1.7 -4.76 1.7 c-3.84 0 -7.26 -2.96 -7.26 -7.2 s3.42 -7.2 7.26 -7.2 c1.84 0 3.46 0.6 4.68 1.66 l-1.58 1.8 c-0.8 -0.6 -1.86 -1 -2.94 -1 c-2.6 0 -4.7 1.98 -4.7 4.74 s2.1 4.74 4.7 4.74 c1.1 0 2.2 -0.42 3.02 -1.08 z M948.3400000000001 18.5 c-1.26 1.1 -2.9 1.7 -4.76 1.7 c-3.84 0 -7.26 -2.96 -7.26 -7.2 s3.42 -7.2 7.26 -7.2 c1.84 0 3.46 0.6 4.68 1.66 l-1.58 1.8 c-0.8 -0.6 -1.86 -1 -2.94 -1 c-2.6 0 -4.7 1.98 -4.7 4.74 s2.1 4.74 4.7 4.74 c1.1 0 2.2 -0.42 3.02 -1.08 z M966.7000000000003 17.58 l6.1 0 l0 2.42 l-6.5 0 l-2.22 0 l0 -14 l2.62 0 l5.92 0 l0 2.42 l-5.92 0 l0 3.36 l4.5 0 l0 2.36 l-4.5 0 l0 3.44 z M993.2600000000002 5.76 c2.38 0 3.96 1.52 4.66 2.9 l-1.94 1.14 c-0.74 -1.1 -1.54 -1.72 -2.72 -1.72 c-1.12 0 -1.92 0.66 -1.92 1.56 c0 0.86 0.52 1.36 1.72 1.8 l0.96 0.36 c2.98 1.06 4.28 2.36 4.28 4.36 c0 2.72 -2.58 4.14 -4.96 4.14 c-2.5 0 -4.46 -1.48 -5.1 -3.44 l2.02 -1.06 c0.5 1.12 1.44 2.12 3.08 2.12 c1.24 0 2.24 -0.6 2.24 -1.72 c0 -1.14 -0.72 -1.64 -2.28 -2.22 l-0.9 -0.32 c-2.08 -0.76 -3.66 -1.8 -3.66 -4.12 c0 -2.2 2.02 -3.78 4.52 -3.78 z M1018.5600000000002 5.76 c2.38 0 3.96 1.52 4.66 2.9 l-1.94 1.14 c-0.74 -1.1 -1.54 -1.72 -2.72 -1.72 c-1.12 0 -1.92 0.66 -1.92 1.56 c0 0.86 0.52 1.36 1.72 1.8 l0.96 0.36 c2.98 1.06 4.28 2.36 4.28 4.36 c0 2.72 -2.58 4.14 -4.96 4.14 c-2.5 0 -4.46 -1.48 -5.1 -3.44 l2.02 -1.06 c0.5 1.12 1.44 2.12 3.08 2.12 c1.24 0 2.24 -0.6 2.24 -1.72 c0 -1.14 -0.72 -1.64 -2.28 -2.22 l-0.9 -0.32 c-2.08 -0.76 -3.66 -1.8 -3.66 -4.12 c0 -2.2 2.02 -3.78 4.52 -3.78 z"></path>
            </g>
          </svg>
        </div>

        <main className="grid gap-1 md:grid-cols-2 lg:grid-cols-2">
          <HomeCard
            heading="Welcome to DisciplineX"
            subHeading="Your partner in promoting discipline among students through
                digital means"
            buttonText="Login"
            navigateTo="/login"
            imageUrl="https://i.pinimg.com/originals/84/22/0a/84220a2fc13e5f62e5f4da4ee1d15112.gif"
          />

          <HomeCard
            //  icon : <FaBullseye className="inline-block mr-2" />
            heading="What We Do"
            subHeading="  We help institutions maintain discipline among students through innovative digital tools"
            imageUrl="https://img.freepik.com/premium-photo/man-child-are-sitting-bench-man-reading-book_1087840-2272.jpg?w=740"
          />

          <HomeCard
            // icon : <FaUserTie className="inline-block mr-2" />
            heading="Who We Are"
            subHeading="DisciplineX is a dedicated team of educators and technologists working together to install discipline in students"
            imageUrl="https://img.freepik.com/premium-photo/colleagues-work-characters-vector-icon-illustration-partnership-business-icon-concept-white-isolated-flat-cartoon-style-suitable-web-landing-page-banner-sticker-background_839035-1758808.jpg?w=740"
          />

          <HomeCard
            // icon : <FaBullseye className="inline-block mr-2" />
            heading="Our Goal"
            subHeading="Our goal is to highlight the value of discipline and habits in students lives and support its development through digital mediums"
            imageUrl="https://ideogram.ai/assets/image/lossless/response/4OkfFmPdRvuU_dbqmR4hSw"
          />

          <HomeCard
            // icon :  <FaSchool className="inline-block mr-2" />
            heading="Helping Institution"
            subHeading=" We assist schools in implementing discipline policies effectively and efficiently using our platform. Institutions can track and manage student behavior, ensuring a learning
            environment"
            imageUrl="https://ideogram.ai/assets/image/lossless/response/PF2-sC7OTbiJ4K2IUkcVvw"
          />

    </main>
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
              <h2 className="text-2xl font-bold mb-6 text-center">
                <FaEnvelope className="inline-block mr-2" /> Contact Us
              </h2>
              <p className="text-lg mb-6 text-center">
                If you are a school administrator interested in our services,
                please contact us at{" "}
                <a
                  href="mailto:omkarchebale0@gmail.com"
                  className="text-blue-500 hover:text-blue-700"
                >
                  info@disciplinex.com
                </a>
                . We look forward to helping you foster a disciplined and
                productive learning environment.
              </p>
            </div>
         

      </div>
    </>
  );
}
