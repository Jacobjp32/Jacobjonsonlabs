import { useI18n } from "@/i18n";

const steps = ["understand", "build", "validate", "launch"] as const;

export default function ProcessSteps() {
  const { t } = useI18n();
  return (
    <ol className="process-sequence mt-10">
      {steps.map((step, index) => (
        <li key={step}>
          <span className="process-sequence__number">0{index + 1}</span>
          <div>
            <h3>{t(`commercial.process.${step}.title`)}</h3>
            <p>{t(`commercial.process.${step}.description`)}</p>
          </div>
        </li>
      ))}
    </ol>
  );
}
