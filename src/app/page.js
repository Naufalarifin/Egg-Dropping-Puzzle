"use client"
import React, { useState } from "react";
import { Source_Serif_4, Montserrat } from "next/font/google";
import Image from "next/image";

const fontTitle = Source_Serif_4({ subsets: ["latin"] });
const fontBody = Montserrat({ subsets: ["latin"] });

function mainPage() {
  const [n, setn] = useState(0)
  const [k, setk] = useState(0)
  const [timeBrute, setTimeBrute] = useState(0)
  const [timeDynamic, setTimeDynamic] = useState(0)

  function measureTime(func) {
    const start = performance.now();
    const res = func();
    const end = performance.now();
    return end - start;
  }

  function eggDrop(n, k) {
    // If there are no floors, then 
    // no trials needed. OR if there 
    // is one floor, one trial needed. 
    if (k == 1 || k == 0)
      return k;

    // We need k trials for one egg 
    // and k floors 
    if (n == 1)
      return k;

    let min = Number.MAX_VALUE;
    let x, res;

    // Consider all droppings from 
    // 1st floor to kth floor and 
    // return the minimum of these 
    // values plus 1.
    for (x = 1; x <= k; x++) {
      res = Math.max(eggDrop(n - 1, x - 1),
        eggDrop(n, k - x));
      if (res < min)
        min = res;
    }
    return min + 1;
  }

  function max(a, b) {
    return (a > b) ? a : b;
  }

  /* Function to get minimum number
   of trials needed in worst
      case with n eggs and k floors */
  function eggDrop2(n, k) {
    /* A 2D table where entry eggFloor[i][j]
 will represent minimum number of trials
needed for i eggs and j floors. */
    let eggFloor = new Array(n + 1);
    for (let i = 0; i < (n + 1); i++) {
      eggFloor[i] = new Array(k + 1);
    }
    let res;
    let i, j, x;

    // We need one trial for one floor and
    // 0 trials for 0 floors
    for (i = 1; i <= n; i++) {
      eggFloor[i][1] = 1;
      eggFloor[i][0] = 0;
    }

    // We always need j trials for one egg
    // and j floors.
    for (j = 1; j <= k; j++)
      eggFloor[1][j] = j;

    // Fill rest of the entries in table using
    // optimal substructure property
    for (i = 2; i <= n; i++) {
      for (j = 2; j <= k; j++) {
        eggFloor[i][j] = Number.MAX_VALUE;
        for (x = 1; x <= j; x++) {
          res = 1 + max(
            eggFloor[i - 1][x - 1],
            eggFloor[i][j - x]);
          if (res < eggFloor[i][j])
            eggFloor[i][j] = res;
        }
      }
    }

    // eggFloor[n][k] holds the result
    return eggFloor[n][k];
  }

  const calculate = () => {
    setTimeBrute(measureTime(() => eggDrop(n, k)))
    setTimeDynamic(measureTime(() => eggDrop2(n, k)))
  }

  return (
    <>
      <div className="bg-[#ffc773] w-full flex flex-col items-center p-4 justify-center">
        <div className="flex mt-16 w-[80%] gap-x-6">
          <div>
            <Image src="/telur.png" width={180} height={180} />
          </div>
          <div className="w-full flex justify-center items-center mb-16">
            <div className="">
              <div className={fontTitle.className}>
                <div className="text-[70px] font-[650] text-[#422f01] mt-6">
                  Egg Dropping Puzzle
                </div>
              </div>
              <div className={fontBody.className}>
                <div className="text-[#422f01] text-2xl mt-[15px] text-justify p-4 font-[460]">
                  In the egg drop problem, you have{" "}
                  <span className="font-bold">N</span> eggs and you want to
                  determine from which floors in a{" "}
                  <span className="font-bold">K</span> floor building you can
                  drop an egg such that is doesn't break. You are to determine
                  the minimum number of attempts you need in order to find the
                  critical floor in the worst case while using the best
                  strategy.
                </div>
              </div>
              <div className={fontBody.className}>
                <div className="text-[#422f01] text-2xl mt-1 text-justify p-4 font-[650]">
                  Rules:
                  <li>An egg that survives a fall can be used again.</li>
                  <li>A broken egg must be discarded.</li>
                  <li>The effect of a fall is the same for all eggs.</li>
                  <li>
                    If an egg breaks when dropped, then it would break if

                    dropped from a higher floor.
                  </li>
                  <li>
                    If an egg survives a fall then it would survive a shorter
                    fall.
                  </li>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
      <div className="bg-[#ffdf92] flex w-full items-end justify-center gap-x-[200px]">
        <div className="border-[11px] border-solid border-[#927d4a] px-10 py-6 rounded-[35px] mt-16 mb-12">
          <div className={fontTitle.className}>
            <div className="text-[55px] font-[590] text-[#422f01] mb-4">
              Input
            </div>
          </div>
          <div className="flex flex-col">
            <input onChange={(ev) => setn(ev.target.value)} type="number" className="border-4 border-solid border-[#927d4a] text-black p-4 rounded-[30px] bg-[#fff8e0] text-center" placeholder="number of eggs" />
            <input onChange={(ev) => setk(ev.target.value)} type="number" className="border-4 border-solid border-[#927d4a] text-black p-4 rounded-[30px] bg-[#fff8e0] mt-4 text-center" placeholder="number of floors" />
          </div>
          <div className="w-full flex justify-center">
            <button onClick={calculate} className="p-2 rounded-3xl bg-[#422f01] text-white w-3/4 mt-4 font-[700]">Enter</button>
          </div>
        </div>
        <div>
          <Image src="/gedung.png" width={300} height={300} />
        </div>
      </div>
      <div className="bg-[#ffe9b4] flex w-full items-center justify-between px-[225px]">
        <div>
          <Image src="/waktu.png" width={250} height={250} />
        </div>
        <div className="flex flex-col justifiy-end items-end">
          <div className={fontTitle.className}>
            <div className="text-[55px] font-[590] text-[#422f01] mb-4">
              Time Complexity
            </div>
          </div>
          <div className="flex">
            <div className={fontTitle.className}>
              <div className="text-[33px] font-[400] text-[#422f01] mr-2">
                Brute Force   :
              </div>
            </div>
            <input value={timeBrute} disabled type="number" className="text-black w-80 border-4 border-solid border-[#422f01] p-4 rounded-[20px] bg-[#fff8e0] text-center" />
          </div>
          <div className="flex mt-4">
            <div className={fontTitle.className}>
              <div className="text-[33px] font-[400] text-[#422f01] mr-2">
                Dynamic Programming :
              </div>
            </div>
            <input value={timeDynamic} disabled type="number" className="text-black w-80 border-4 border-solid border-[#422f01] p-4 rounded-[20px] bg-[#fff8e0] text-center" />
          </div>
        </div>
      </div>
    </>
  );
}

export default mainPage;
