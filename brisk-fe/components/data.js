import {
  FaceSmileIcon,
  ChartBarSquareIcon,
  CursorArrowRaysIcon,
  DevicePhoneMobileIcon,
  AdjustmentsVerticalIcon,
  SunIcon,
} from "@heroicons/react/outline";

import benefitOneImg from "../public/img/benefit-one.png";
import benefitTwoImg from "../public/img/benefit-two.png";
import benefitThreeImg from "../public/img/benefit-two.png";

const benefitOne = {
  title: "Your Personal TA",
  desc: "Our virtual assistant is designed specifically for teachers, to streamline your workflow. Connect to a wide range of tools and automate many of the tedious tasks that take up so much of your day.",
  image: benefitOneImg,
  bullets: [
    {
      title: "Do multi-step tasks easily",
      desc: "Jumping between your learning management system, a student information system, Google Drive, email, and other tools can be a pain. Brisk can do it all for you.",
      icon: <FaceSmileIcon />,
    },
    {
      title: "Use tools faster",
      desc: "Rather than navigating through and learning new tools, Brisk is a unified interface that allows you to use all of your tools in one place.",
      icon: <ChartBarSquareIcon />,
    },
    {
      title: "Schedule tasks to run automatically",
      desc: "We know that you have a lot on your plate. Curate a workflow that you can run at any time, or schedule it to run automatically.",
      icon: <CursorArrowRaysIcon />,
    },
  ],
};

const benefitTwo = {
  title: "Your Personal Data Analyst",
  desc: "Don't let data analysis and monitoring take up all your time – just tell Brisk what you want to see and let it handle the rest. Easily analyze and monitor student data from student information systems, learning management systems, and more, all without any technical headaches.",
  image: benefitTwoImg,
  bullets: [
    {
      title: "No more exporting to Excel",
      desc: "Use language to describe the data you want to use and how you want to visualize it (e.g. a chart, a table, etc.). Brisk will do the rest.",
      icon: <DevicePhoneMobileIcon />,
    },
    {
      title: "Connect and visualize all of your data in one place",
      desc: "The most powerful classroom insights are built on identifying patterns across different data sources. Brisk simplifies this.",
      icon: <AdjustmentsVerticalIcon />,
    },
    {
      title: "Let Brisk highlight important insights",
      desc: "Use Brisk's Monitoring tool to set up alerts for events that you want to be notified about.",
      icon: <SunIcon />,
    },
  ],
};

const benefitThree = {
  title: "Your Personal Curriculum Writer",
  desc: "Effortlessly create, customize, and differentiate content, or source existing curriculum from the internet. Convert texts to lexile-appropriate versions, generate lesson plans and worksheets, and audit your curriculum for state standards.",
  image: benefitThreeImg,
  bullets: [
    {
      title: "Create and source worksheets, resources and exam questions",
      desc: "Brisk uses proprietary data and technology to find and create learning content that is tailored to your classroom needs.",
      icon: <DevicePhoneMobileIcon />,
    },
    {
      title: "Customize curriculum for your teaching needs",
      desc: "Brisk learns about your personal teaching style and preferences by ingesting curriculum you like to use and by responding to your feedback.",
      icon: <AdjustmentsVerticalIcon />,
    },
    {
      title: "Localize, personalize, and differentiate curriculum",
      desc: "Brisk can help you personalize curriculum for individual students, groups of students, or entire classes.",
      icon: <SunIcon />,
    },
  ],
};

export { benefitOne, benefitTwo, benefitThree };
