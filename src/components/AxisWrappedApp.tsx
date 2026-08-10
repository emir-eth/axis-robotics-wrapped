"use client";

import { AnimatePresence, motion } from "framer-motion";
import { useState } from "react";
import { BrandPreloader } from "@/components/intro/BrandPreloader";
import { CinematicIntro } from "@/components/intro/CinematicIntro";
import { LandingPage } from "@/components/input/LandingPage";
import { WrappedExperience } from "@/components/wrapped/WrappedExperience";
import {
  EMPTY_FORM_VALUES,
  SAMPLE_FORM_VALUES,
} from "@/lib/sample-data";
import type {
  AxisWrappedData,
  WrappedFormErrors,
  WrappedFormValues,
  WrappedPhase,
} from "@/lib/types";
import { validateWrappedForm } from "@/lib/validation";

export function AxisWrappedApp() {
  const [phase, setPhase] = useState<WrappedPhase>("preloader");
  const [values, setValues] = useState<WrappedFormValues>(EMPTY_FORM_VALUES);
  const [errors, setErrors] = useState<WrappedFormErrors>({});
  const [data, setData] = useState<AxisWrappedData | null>(null);
  const [sceneIndex, setSceneIndex] = useState(0);

  function handleChange(key: keyof WrappedFormValues, value: string) {
    setValues((current) => ({ ...current, [key]: value }));
    if (errors[key]) {
      setErrors((current) => {
        const next = { ...current };
        delete next[key];
        return next;
      });
    }
  }

  function handleSubmit() {
    const result = validateWrappedForm(values);
    setErrors(result.errors);
    if (!result.data) return;

    setData(result.data);
    setSceneIndex(0);
    setPhase("story");
  }

  function handleLoadSample() {
    setValues(SAMPLE_FORM_VALUES);
    setErrors({});
  }

  function handleRestart() {
    setPhase("input");
    setSceneIndex(0);
  }

  return (
    <AnimatePresence mode="wait">
      {phase === "preloader" ? (
        <BrandPreloader
          key="preloader"
          onComplete={() => setPhase("intro")}
        />
      ) : phase === "intro" ? (
        <CinematicIntro key="intro" onComplete={() => setPhase("input")} />
      ) : phase === "input" ? (
        <motion.div
          key="input"
          initial={{ opacity: 0, y: 12, filter: "blur(6px)" }}
          animate={{ opacity: 1, y: 0, filter: "blur(0px)" }}
          exit={{ opacity: 0, scale: 0.985 }}
          transition={{ duration: 0.5, ease: [0.16, 1, 0.3, 1] }}
        >
          <LandingPage
            values={values}
            errors={errors}
            onChange={handleChange}
            onSubmit={handleSubmit}
            onLoadSample={handleLoadSample}
          />
        </motion.div>
      ) : (
        data && (
          <motion.div
            key="story"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.45 }}
          >
            <WrappedExperience
              data={data}
              sceneIndex={sceneIndex}
              onSceneChange={setSceneIndex}
              onRestart={handleRestart}
            />
          </motion.div>
        )
      )}
    </AnimatePresence>
  );
}
