import { Shield, AlertTriangle, CheckCircle, Info, XCircle } from "lucide-react";
import { Progress } from "@/components/ui/progress";

interface AnalysisResultProps {
  result: {
    isDeepfake: boolean;
    confidence: number;
    reasons: string[];
    tips: string[];
  } | null;
}

const AnalysisResult = ({ result }: AnalysisResultProps) => {
  if (!result) return null;

  const { isDeepfake, confidence, reasons, tips } = result;

  const getStatusColor = () => {
    if (isDeepfake) {
      if (confidence > 80) return "destructive";
      return "warning";
    }
    // If real
    if (confidence > 80) return "success";
    return "success"; // Or maybe a neutral blue? Stick to success for now.
  };

  const getStatusIcon = () => {
    if (isDeepfake) {
      if (confidence > 80) return <XCircle className="w-8 h-8 text-destructive" />;
      return <AlertTriangle className="w-8 h-8 text-warning" />;
    }
    return <CheckCircle className="w-8 h-8 text-success" />;
  };

  const getStatusText = () => {
    if (isDeepfake) {
      if (confidence > 80) return "Deepfake Detected";
      return "Potential Manipulation";
    }
    if (confidence > 80) return "Authentic Media";
    return "Likely Authentic";
  };

  const getProgressColor = () => {
    if (isDeepfake) {
      if (confidence > 80) return "bg-destructive";
      return "bg-warning";
    }
    return "bg-success";
  };

  return (
    <div className="w-full max-w-3xl mx-auto space-y-6 animate-fade-in">
      {/* Main result card */}
      <div className="p-8 rounded-2xl bg-white border border-border shadow-xl hover:shadow-2xl transition-all duration-200 ease-in-out">
        <div className="flex items-center gap-5 mb-8">
          <div className={`w-20 h-20 rounded-2xl flex items-center justify-center shadow-lg ${isDeepfake ?
              (confidence > 80 ? "bg-destructive/10 border border-destructive/20" : "bg-warning/10 border border-warning/20") :
              "bg-success/10 border border-success/20"
            }`}>
            {getStatusIcon()}
          </div>
          <div>
            <h3 className="text-3xl font-display font-bold text-foreground mb-1">
              {getStatusText()}
            </h3>
            <p className="text-muted-foreground font-medium">
              Analysis complete
            </p>
          </div>
        </div>

        {/* Confidence meter */}
        <div className="mb-8">
          <div className="flex justify-between items-center mb-3">
            <span className="text-sm font-semibold text-foreground uppercase tracking-wide">Confidence Score</span>
            <span className={`text-3xl font-bold ${isDeepfake ?
                (confidence > 80 ? "text-destructive" : "text-warning") :
                "text-success"
              }`}>{confidence}%</span>
          </div>
          <div className="h-4 rounded-full bg-secondary overflow-hidden shadow-inner">
            <div
              className={`h-full rounded-full transition-all duration-1000 ease-out ${getProgressColor()}`}
              style={{ width: `${confidence}%` }}
            />
          </div>
          <p className="text-sm text-muted-foreground mt-3 font-medium">
            {isDeepfake ? (
              confidence > 80 ? "High probability of AI manipulation detected." : "Some anomalies detected, but not conclusive."
            ) : (
              confidence > 80 ? "Media appears highly consistent and authentic." : "No significant manipulation detected."
            )}
          </p>
        </div>

        {/* Detection reasons */}
        <div className="space-y-4">
          <h4 className="text-base font-semibold text-foreground flex items-center gap-2 mb-4">
            <Info className="w-5 h-5 text-primary" />
            Analysis Details
          </h4>
          <ul className="space-y-3">
            {reasons.map((reason, index) => (
              <li
                key={index}
                className="flex items-start gap-4 text-sm text-foreground p-4 rounded-xl bg-secondary/30 border border-border/50 hover:bg-secondary/50 hover:border-primary/30 transition-all duration-200 ease-in-out"
              >
                <span className="w-7 h-7 rounded-full bg-primary/20 flex items-center justify-center text-xs text-primary font-bold flex-shrink-0 mt-0.5 border border-primary/30">
                  {index + 1}
                </span>
                <span className="pt-0.5">{reason}</span>
              </li>
            ))}
          </ul>
        </div>
      </div>

      {/* Tips card */}
      <div className="p-8 rounded-2xl border-2 border-primary/20 bg-gradient-to-br from-primary/5 to-primary/10 shadow-xl hover:shadow-2xl transition-all duration-200 ease-in-out">
        <h4 className="text-xl font-display font-semibold text-foreground mb-5 flex items-center gap-3">
          <Shield className="w-6 h-6 text-primary" />
          How to Stay Safe
        </h4>
        <ul className="space-y-4">
          {tips.map((tip, index) => (
            <li
              key={index}
              className="flex items-start gap-3 text-sm text-foreground font-medium"
            >
              <CheckCircle className="w-5 h-5 text-primary flex-shrink-0 mt-0.5" />
              <span>{tip}</span>
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
};

export default AnalysisResult;
