import Image from "next/legacy/image";
import Container from "./container";
import heroImg from "../public/img/hero.png";
import { TOOLDICTIONARY } from "./CurrentWorkflow";

export default function Hero() {
  return (
    <>
      <Container className="flex flex-wrap ">
        <div className="flex items-center lg:w-1/2">
          <div className="max-w-2xl mb-8">
            <h1 className="text-4xl font-bold leading-snug tracking-tight text-gray-800 lg:text-4xl lg:leading-tight xl:text-5xl xl:leading-tight dark:text-white">
              Transform Your Classroom with an AI Assistant
            </h1>
            <p className="py-5 text-xl leading-normal text-gray-500 lg:text-xl xl:text-2xl dark:text-gray-300">
              Say goodbye to time-consuming tasks and hello to more time spent on what really matters: <b>your students.</b>
            </p>

            <div className="flex flex-col my-10 pt-10">
              <a
                href="https://github.com/web3templates"
                className="px-8 py-4 text-lg font-medium text-center text-white bg-indigo-600 rounded-md ">
                  Join Waitlist
              </a>
            </div>
          </div>
        </div>
        <div className="flex items-center justify-center lg:w-1/2">
          <div className="hidden lg:block">
            <Image
              src={heroImg}
              width="616"
              height="617"
              alt="Hero Illustration"
              layout="intrinsic"
              loading="eager"
              placeholder="blur"
            />
          </div>
        </div>
      </Container>
      <Container>
        <div className="flex flex-col justify-center">
          <div className="text-xl text-center text-gray-700 dark:text-white">
            Integrated with <span className="text-indigo-600">20+</span> teacher tools:
          </div>

          <div className="flex flex-wrap justify-center gap-5 mt-10 md:justify-around text-center font-semibold">
            <div className="text-gray-700">
              <Canvas />
            </div>
            <div className="text-gray-800 dark:text-gray-700">
              <GoogleDrive />
            </div>
            <div className="text-gray-800 dark:text-gray-700">
              <Aries />
            </div>
            <div className=" text-gray-800 dark:text-gray-700">
              <GPTLogo />
            </div>
            <div className=" text-gray-800 dark:text-gray-700">
              <PowerschoolLogo />
            </div>
            <div className=" text-gray-800 dark:text-gray-700">
              <Gmail />
            </div>
          </div>

        </div>
      </Container>
    </>
  );
}

function Gmail() {
  return (
    <div>
      <div className="relative w-20 h-20">
      <img width="max" height="max" src={TOOLDICTIONARY["gmail"]} />
      </div>
      Gmail
    </div>
  )
}

function Canvas() {
  return (
    <div>
      <div className="relative w-20 h-20">
      <img width="max" height="max" src={TOOLDICTIONARY["canvas"]} />
      </div>
      Canvas
    </div>
  )
}

function GoogleDrive() {
  return (
    <div className="flex flex-col justify-center">
      <div className="relative w-20 h-20">
      <img width="max" height="max" src={TOOLDICTIONARY["google drive"]} />
      </div>
      Google Drive
    </div>
  )
}

function Aries() {
  return (
    <div className="flex flex-col justify-center">
      <div className="relative w-20 h-20">
      <img className="align-center" width="max" height="max" src={TOOLDICTIONARY["aries"]} />
      </div>
      Aries SIS
    </div>
  )
}

function GPTLogo() {
  return (
    <div className="flex flex-col justify-center">
      <div className="w-20">
      <img className="align-center" width="max" height="max" src={TOOLDICTIONARY["writing integrity"]} />
      </div>
      GPT Detector
    </div>
  )
}

function PowerschoolLogo() {
  return (
    <div className="flex flex-col justify-center">
      <div className="w-20">
      <img className="align-center" width="max" height="max" src={TOOLDICTIONARY["powerschool"]} />
      </div>
      Powerschool SIS
    </div>
  )
}


