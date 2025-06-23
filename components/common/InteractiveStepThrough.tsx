import { useState } from 'react';
import StepThroughCodeAnimation, { Step } from '../pageComponents/JavaScript/StepThroughCodeAnimation';
import Box from '@mui/material/Box';
import FormControl from '@mui/material/FormControl';
import InputLabel from '@mui/material/InputLabel';
import Select from '@mui/material/Select';
import MenuItem from '@mui/material/MenuItem';

type InputOption = {
  label: string;
  value: string | number;
};

type InteractiveStepThroughProps = {
  codeTemplate: (inputs: Record<string, string | number>) => string[];
  stepsTemplate: (inputs: Record<string, string | number>) => Step[];
  inputConfigs: {
    name: string;
    label: string;
    options: InputOption[];
    defaultValue?: string | number;
  }[];
  style?: React.CSSProperties;
};

export default function InteractiveStepThrough({
  codeTemplate,
  stepsTemplate,
  inputConfigs,
  style = {},
}: InteractiveStepThroughProps) {
  // Initialize state for each input
  const initialInputs = Object.fromEntries(
    inputConfigs.map(cfg => [cfg.name, cfg.defaultValue ?? cfg.options[0].value])
  );
  const [inputs, setInputs] = useState<Record<string, string | number>>(initialInputs);

  // Generate code and steps based on current inputs
  const code = codeTemplate(inputs);
  const steps = stepsTemplate(inputs);

  return (
    <Box sx={{ ...style, p: 2, borderRadius: 2, bgcolor: '#f8fafc', mb: 3 }}>
      <Box sx={{ display: 'flex', gap: 3, mb: 2, flexWrap: 'wrap' }}>
        {inputConfigs.map(cfg => (
          <FormControl key={cfg.name} size="small" sx={{ minWidth: 160 }}>
            <InputLabel id={`${cfg.name}-label`}>{cfg.label}</InputLabel>
            <Select
              labelId={`${cfg.name}-label`}
              value={inputs[cfg.name]}
              label={cfg.label}
              onChange={e =>
                setInputs(prev => ({ ...prev, [cfg.name]: e.target.value }))
              }
            >
              {cfg.options.map(opt => (
                <MenuItem key={opt.value} value={opt.value}>
                  {opt.label}
                </MenuItem>
              ))}
            </Select>
          </FormControl>
        ))}
      </Box>
      <StepThroughCodeAnimation code={code} steps={steps} />
    </Box>
  );
}