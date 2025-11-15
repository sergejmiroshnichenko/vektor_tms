import { Resolver, useForm } from 'react-hook-form';
import { IServiceLog, ServiceTypes } from 'types/IServiceLog.ts';
import { FormValues } from 'components/ServiceLogForm/FormValues.types.ts';
import { yupResolver } from '@hookform/resolvers/yup';
import { serviceLogSchema } from 'components/ServiceLogForm/serviceLogSchema.ts';
import {
  getEmptyValues,
  getInitialEditValues,
} from 'components/ServiceLogForm/FormInitialValues.ts';
import { setUpdateLog } from 'store/slices/serviceLogsSlice.ts';
import { useAppDispatch, useAppSelector } from 'hooks/redux-hooks.ts';
import { EquipmentSection } from 'components/ServiceLogForm/FormSections/EquipmentSection.tsx';
import { ProviderSection } from 'components/ServiceLogForm/FormSections/ProviderSection.tsx';
import { ServiceDetailsSection } from 'components/ServiceLogForm/FormSections/ServiceDetailsSection.tsx';
import { completedDraft } from 'store/slices/draftsSlice.ts';

export const ServiceLogForm = () => {
  const { editingLog } = useAppSelector(state => state.serviceLogs);
  const { draftsList } = useAppSelector(state => state.serviceDrafts);

  const dispatch = useAppDispatch();

  const { control, watch, setValue, handleSubmit } = useForm<FormValues>({
    mode: 'onChange',
    reValidateMode: 'onChange',
    resolver: yupResolver(serviceLogSchema) as Resolver<FormValues>,
    defaultValues: editingLog
      ? getInitialEditValues(editingLog)
      : getEmptyValues(),
    // getEmptyServiceLog(),
  });

  const onSubmit = (data: FormValues) => {
    console.log('Form data', data);

    const commonLogFields = {
      type: data.type as ServiceTypes,
      completedDate: data.dateIn.format('YYYY-MM-DD'),
      odometer: data.odometer ?? 0,
      engineHours: data.engineHours ?? 0,
      serviceDescription: data.serviceDescription ?? '',
      serviceOrder: data.serviceOrder,
      provider: data.provider,
      equipment: data.equipment,
    };

    if (!editingLog) {
      const newLog: IServiceLog = {
        // id: String(logs.length + 1),
        id: String(draftsList.length),
        driver: '',
        totalAmount: 0,
        ...commonLogFields,
      };
      // dispatch(addNewLog(newLog));
      // dispatch(addDraft({ draft: newLog }));
      dispatch(completedDraft({ id: newLog.id, draft: data }));
      // dispatch(setModalActive(false));
    } else {
      const updatedLog = {
        ...editingLog,
        ...commonLogFields,
        id: editingLog.id,
        driver: editingLog.driver,
        totalAmount: editingLog.totalAmount,
      };
      dispatch(setUpdateLog(updatedLog));
    }
  };

  return (
    <form id="service-log-form" noValidate onSubmit={handleSubmit(onSubmit)}>
      <ProviderSection control={control} />
      <EquipmentSection control={control} setValue={setValue} watch={watch} />
      <ServiceDetailsSection
        control={control}
        watch={watch}
        setValue={setValue}
      />
    </form>
  );
};
