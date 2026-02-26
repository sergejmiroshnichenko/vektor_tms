import { Resolver, useForm } from 'react-hook-form';
import { FormValues } from './FormValues.types.ts';
import { yupResolver } from '@hookform/resolvers/yup';
import { serviceLogSchema } from './serviceLogSchema.ts';
import { getEditValues, getEmptyValues } from './FormDefaults.ts';
import { addNewLog, setUpdateLog } from 'store/slices/serviceLogsSlice.ts';
import { useAppDispatch, useAppSelector } from 'hooks/redux-hooks.ts';
import { EquipmentSection } from './FormSections/EquipmentSection.tsx';
import { ProviderSection } from './FormSections/ProviderSection.tsx';
import { ServiceDetailsSection } from './FormSections/ServiceDetailsSection.tsx';
import {
  autoSavingDraft,
  completedDraft,
  deleteActiveDraft,
  setEditingStatus,
} from 'store/slices/draftsSlice.ts';
import { useEffect } from 'react';
import {
  convertFormValuesToServiceLog,
  fromDraftForm,
  toDraftForm,
} from './FormConverts.ts';
import { useSnackbar } from 'notistack';

export const ServiceLogForm = () => {
  const { editingLog } = useAppSelector(state => state.serviceLogs);
  const { activeDraftId, draftsList } = useAppSelector(
    state => state.serviceDrafts,
  );

  const dispatch = useAppDispatch();
  const { enqueueSnackbar } = useSnackbar();

  const { control, watch, setValue, handleSubmit, reset, getValues } =
    useForm<FormValues>({
      mode: 'onChange',
      reValidateMode: 'onChange',
      resolver: yupResolver(serviceLogSchema) as Resolver<FormValues>,
      defaultValues: getEmptyValues(),
    });

  const activeDraft = draftsList.find(draft => draft.id === activeDraftId);

  useEffect(() => {
    // if edit current log === IServiceLog
    if (editingLog) {
      reset(getEditValues(editingLog));
      return;
    }
    // when open draft
    if (activeDraft) {
      reset(fromDraftForm(activeDraft.draft));
      return;
    }
    reset(getEmptyValues()); // when there is nothing —> empty form
  }, [activeDraftId, editingLog, reset]);

  useEffect(() => {
    if (!activeDraftId || editingLog) return;

    let timer: ReturnType<typeof setTimeout>;

    // subscribe on change fields form
    const subscription = watch(() => {
      const fullValues = getValues(); // FormValues
      const isActuallyChanged =
        // reset (Submit draft => Save), if there were changes in the form fields
        JSON.stringify(fullValues) !== JSON.stringify(activeDraft?.draft); // should be 'false',then if click on the another draft.isCompleted

      const skipKeys = ['type', 'dateIn', 'dateOut'];

      Object.entries(fullValues).some(([key, value]) => {
        if (!skipKeys.includes(key) && value) {
          dispatch(setEditingStatus({ id: activeDraftId }));
        }
      });
      clearTimeout(timer);

      timer = setTimeout(() => {
        dispatch(
          autoSavingDraft({
            id: activeDraftId,
            draft: toDraftForm(fullValues),
            isChanged: isActuallyChanged,
          }),
        );
      }, 400);
    });

    return () => {
      clearTimeout(timer);
      subscription.unsubscribe();
    };
  }, [activeDraftId, dispatch, watch, editingLog]);

  const onSubmit = (data: FormValues) => {
    const isSubmittingDraft = !editingLog && activeDraft?.isCompleted;

    if (editingLog) {
      dispatch(
        setUpdateLog(
          convertFormValuesToServiceLog(editingLog.id, data, editingLog),
        ),
      );
      enqueueSnackbar('Service log updated', {
        variant: 'success',
      });
      return;
    }

    dispatch(completedDraft({ id: activeDraftId, draft: toDraftForm(data) }));

    if (isSubmittingDraft) {
      const serviceLog = convertFormValuesToServiceLog(activeDraftId, data);
      dispatch(addNewLog(serviceLog));
      dispatch(deleteActiveDraft(activeDraftId));
      enqueueSnackbar('Draft successfully submitted', {
        variant: 'success',
      });
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
