'use client';

import clsx from 'clsx';
import Image from 'next/image';
import React from 'react';

import TextToSpeechButton from '../buttons/TextToSpeechButton';

import type { AboutMeType } from '@/locales/types';

const stats: {
  label: 'code' | 'energy';
  value: string;
}[] = [
  { label: 'code', value: '2010' },
  { label: 'energy', value: '704' },
];

export default function AboutMe({ lang }: { lang: AboutMeType }) {
  const textToSpeech =
    lang.title +
    '\n\n' +
    lang.description.join(' ') +
    '\n\nFunfacts:\n' +
    lang.stats.code +
    ' ' +
    stats[0].value +
    '\n' +
    lang.stats.energy +
    ' ' +
    stats[1].value;

  return (
    <div className='bg-brand-mint/25' id='AboutMe'>
      <div className='py-24 sm:pb-32 md:pt-56'>
        <div className='mx-auto max-w-7xl px-6 lg:px-8'>
          <div className='mx-auto max-w-2xl items-start gap-x-8 gap-y-16 sm:gap-y-24 lg:mx-0 lg:max-w-none flex flex-col lg:flex-row-reverse lg:justify-between'>
            <div>
              <div className='text-base leading-7 text-gray-700 lg:max-w-lg'>
                <div className='flex flex-col sm:flex-row gap-4 sm:items-center justify-between'>
                  <h3 className='text-3xl font-bold tracking-tight text-gray-900 sm:text-4xl'>
                    {lang.title}
                  </h3>
                  <TextToSpeechButton text={textToSpeech} />
                </div>

                <div className='max-w-xl'>
                  {lang.description.map((paragraph: string, index: number) => (
                    <p
                      key={index}
                      className={clsx({
                        'mt-6': index === 0,
                        'mt-8': index !== 0,
                      })}
                    >
                      {paragraph}
                    </p>
                  ))}
                </div>
              </div>
              <dl className='mt-10 grid grid-cols-2 gap-8 border-t border-gray-900/10 pt-10 sm:grid-cols-4'>
                {stats.map(
                  (
                    stat: {
                      label: keyof typeof lang.stats;
                      value: string;
                    },
                    statIdx: number
                  ) => (
                    <div key={statIdx} className='flex flex-col items-center'>
                      <dt className='text-sm font-semibold leading-6 text-gray-600'>
                        {lang.stats[stat.label]}
                      </dt>
                      <dd className='mt-2 text-3xl font-bold leading-10 tracking-tight text-gray-900'>
                        {stat.value}
                      </dd>
                    </div>
                  )
                )}
              </dl>
            </div>
            <div className='lg:pr-4'>
              <Image
                width={512}
                height={577}
                src='/guru.jpg'
                alt='Portrait like a Nerd'
                className='overflow-hidden rounded-3xl shadow-2xl lg:max-w-lg'
              />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
