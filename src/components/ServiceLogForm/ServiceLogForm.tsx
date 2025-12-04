import { Resolver, useForm } from 'react-hook-form';
import { ServiceTypes } from 'types/IServiceLog.ts';
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
import {
  autoSavingDraft,
  completedDraft,
  setEditingStatus,
} from 'store/slices/draftsSlice.ts';
import { useEffect } from 'react';

export const ServiceLogForm = () => {
  const { editingLog } = useAppSelector(state => state.serviceLogs);
  const { activeDraftId, draftsList } = useAppSelector(
    state => state.serviceDrafts,
  );

  const dispatch = useAppDispatch();

  const { control, watch, setValue, handleSubmit, reset } = useForm<FormValues>(
    {
      mode: 'onChange',
      reValidateMode: 'onChange',
      resolver: yupResolver(serviceLogSchema) as Resolver<FormValues>,
      defaultValues: editingLog
        ? getInitialEditValues(editingLog)
        : getEmptyValues(),
    },
  );

  const activeDraft = draftsList.find(draft => draft.id === activeDraftId);

  useEffect(() => {
    if (editingLog) {
      return reset(getInitialEditValues(editingLog));
    }
    if (activeDraft) {
      reset(activeDraft.draft);
    } else {
      reset(getEmptyValues());
    }
  }, [activeDraftId, editingLog]);

  useEffect(() => {
    if (!activeDraftId) return;

    let timer: ReturnType<typeof setTimeout>;

    // subscribe on change fields form
    const subscription = watch(values => {
      const isActuallyChanged =
        JSON.stringify(values) !== JSON.stringify(activeDraft?.draft); // should be 'false',then if click on the another draft.isCompleted

      const skipKeys = ['type', 'dateIn', 'dateOut'];

      Object.entries(values).some(([key, value]) => {
        if (!skipKeys.includes(key) && value) {
          dispatch(setEditingStatus({ id: activeDraftId }));
        }
      });
      clearTimeout(timer);

      timer = setTimeout(() => {
        dispatch(
          autoSavingDraft({
            id: activeDraftId,
            draft: values as FormValues,
            isChanged: isActuallyChanged,
          }),
        );
      }, 400);
    });

    return () => {
      clearTimeout(timer);
      subscription.unsubscribe();
    };
  }, [activeDraftId, dispatch, watch]);

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
      dispatch(completedDraft({ id: activeDraftId, draft: data }));
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
