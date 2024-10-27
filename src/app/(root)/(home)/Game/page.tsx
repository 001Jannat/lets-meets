'use client';

import React from 'react';
import Image from 'next/image';

interface GameCardProps {
  img: string;
  title: string;
  description: string;
  onClick?: () => void;
}

const GameCard = ({ img, title, description, onClick }: GameCardProps) => (
  <div
    className="bg-pink-400 px-4 py-6 flex flex-col justify-between w-full xl:max-w-[270px] min-h-[260px] rounded-[14px] cursor-pointer"
    onClick={onClick}
  >
    <div className="flex justify-center items-center glassmorphism size-12 rounded-[10px]">
      <Image src={img} alt={title} width={27} height={27} />
    </div>
    <div className="flex flex-col gap-2">
      <h1 className="text-2xl font-bold">{title}</h1>
      <p className="text-lg font-normal">{description}</p>
    </div>
  </div>
);

const GamePage = () => {
  return (
    <div className="flex flex-wrap gap-6 justify-center p-6">
      <GameCard
     
        img="/icons/ttt.svg"
        title="Tic Tac Toe"
        description="Classic 3x3 grid game."
        onClick={() => alert('Opening Tic Tac Toe')}
      />
      <GameCard
        img="/icons/rps.svg"
        title="Rock Paper Scissors"
        description="Best of luck to beat the computer!"
        onClick={() => alert('Opening Rock Paper Scissors')}
      />
      <GameCard
        img="/icons/quiz.svg"
        title="Quiz Game"
        description="Test your knowledge with fun quizzes."
        onClick={() => alert('Opening Quiz Game')}
      />
    </div>
  );
};

export default GamePage;
