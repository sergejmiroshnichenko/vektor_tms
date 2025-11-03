import PrivacyTipIcon from '@mui/icons-material/PrivacyTip';
import { InputField } from 'components/InputField.tsx';
import { Section } from 'components/Section.tsx';
import { Control } from 'react-hook-form';
import { FormValues } from 'components/ServiceLogForm/FormValues.types.ts';

interface ProviderSectionProps {
  control: Control<FormValues>;
}

export const ProviderSection = ({ control }: ProviderSectionProps) => {
  return (
    <Section
      title="1.Provider Details"
      icon={<PrivacyTipIcon color="primary" />}
      direction={'row'}>
      <InputField
        name="provider"
        control={control}
        label="Provider"
        placeholder="Provider"
        required
      />
      <InputField
        name="serviceOrder"
        control={control}
        label="Service Order"
        placeholder="Enter Service Order"
        required
      />
    </Section>
  );
};
