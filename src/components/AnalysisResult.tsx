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
    if (isDeepfake && confidence > 70) return "destructive";
    if (isDeepfake && confidence > 40) return "warning";
    return "success";
  };

  const getStatusIcon = () => {
    const status = getStatusColor();
    if (status === "destructive") return <XCircle className="w-8 h-8 text-destructive" />;
    if (status === "warning") return <AlertTriangle className="w-8 h-8 text-warning" />;
    return <CheckCircle className="w-8 h-8 text-success" />;
  };

  const getStatusText = () => {
    if (isDeepfake && confidence > 70) return "Likely Manipulated";
    if (isDeepfake && confidence > 40) return "Possibly Manipulated";
    return "Likely Authentic";
  };

  const getProgressColor = () => {
    const status = getStatusColor();
    if (status === "destructive") return "bg-destructive";
    if (status === "warning") return "bg-warning";
    return "bg-success";
  };

  return (
    <div className="w-full max-w-2xl mx-auto space-y-6 animate-fade-in">
      {/* Main result card */}
      <div className="p-6 rounded-2xl card-gradient border border-border">
        <div className="flex items-center gap-4 mb-6">
          <div className={`w-16 h-16 rounded-xl flex items-center justify-center ${
            isDeepfake ? "bg-destructive/10" : "bg-success/10"
          }`}>
            {getStatusIcon()}
          </div>
          <div>
            <h3 className="text-2xl font-display font-bold text-foreground">
              {getStatusText()}
            </h3>
            <p className="text-muted-foreground">
              Analysis complete
            </p>
          </div>
        </div>

        {/* Confidence meter */}
        <div className="mb-6">
          <div className="flex justify-between items-center mb-2">
            <span className="text-sm text-muted-foreground">Confidence Score</span>
            <span className="text-lg font-bold text-foreground">{confidence}%</span>
          </div>
          <div className="h-3 rounded-full bg-secondary overflow-hidden">
            <div 
              className={`h-full rounded-full transition-all duration-1000 ease-out ${getProgressColor()}`}
              style={{ width: `${confidence}%` }}
            />
          </div>
          <p className="text-xs text-muted-foreground mt-2">
            {confidence > 70 ? "High confidence in analysis" : 
             confidence > 40 ? "Moderate confidence - review carefully" : 
             "Low indicators of manipulation"}
          </p>
        </div>

        {/* Detection reasons */}
        <div className="space-y-3">
          <h4 className="text-sm font-semibold text-foreground flex items-center gap-2">
            <Info className="w-4 h-4 text-primary" />
            Analysis Details
          </h4>
          <ul className="space-y-2">
            {reasons.map((reason, index) => (
              <li 
                key={index}
                className="flex items-start gap-3 text-sm text-muted-foreground p-3 rounded-lg bg-secondary/50"
              >
                <span className="w-5 h-5 rounded-full bg-primary/20 flex items-center justify-center text-xs text-primary font-bold flex-shrink-0 mt-0.5">
                  {index + 1}
                </span>
                {reason}
              </li>
            ))}
          </ul>
        </div>
      </div>

      {/* Tips card */}
      <div className="p-6 rounded-2xl border border-primary/30 bg-primary/5">
        <h4 className="text-lg font-display font-semibold text-foreground mb-4 flex items-center gap-2">
          <Shield className="w-5 h-5 text-primary" />
          How to Stay Safe
        </h4>
        <ul className="space-y-3">
          {tips.map((tip, index) => (
            <li 
              key={index}
              className="flex items-start gap-3 text-sm text-muted-foreground"
            >
              <CheckCircle className="w-4 h-4 text-primary flex-shrink-0 mt-0.5" />
              {tip}
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
};

export default AnalysisResult;
