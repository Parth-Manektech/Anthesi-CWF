import React, { useState } from 'react'
import { Controller, useForm } from 'react-hook-form';
import Select from 'react-select';
import { LeftArrowIcon, RightArrowIcon } from '../../Assets/SVGs';
import { useQuery } from 'react-query';
import { GetmunicipalityData, Getprovince, Getstate } from '../../Query/SelectAdress/selectAdress.query';
import { Loader } from '../Loader';

function SelectAddress() {
    const { control, formState: { errors }, handleSubmit, watch, reset, setValue } = useForm({ mode: 'onSubmit' });
    const [stateData, setStateData] = useState([])
    const [provinceData, setProvinceData] = useState([])
    const [municipalityData, setMunicipalityData] = useState([])

    const { isFetching: isFetchingStateData, isLoading: isLoadingStateData } = useQuery('getStateData', () => Getstate(), {
        select: (data) => data?.data?.value,
        onSuccess: (response) => {
            const statesOption = response?.matchingEntities?.map((element) => {
                return { "label": element?.areaName, "value": element?.minCode, ...element }
            })
            setStateData(statesOption);
        },
        staleTime: 60 * 60 * 1000,
        cacheTime: 60 * 60 * 1000,
        refetchOnWindowFocus: false,
        refetchOnMount: false,
    });

    const { isLoading: isProvinceLoading, isFetching: isProvinceFetching } = useQuery(['getProvinceData', Number(watch('state')?.value)], () => Getprovince(watch('state')), {
        enabled: !!watch('state'),
        select: (data) => data?.data?.value,
        onSuccess: (response) => {
            const provinceData = response?.matchingEntities?.map((e) => { return { "label": e?.name, "value": e?.id, ...e } })
            setProvinceData(provinceData)
        },
        refetchOnWindowFocus: false
    })

    const { isLoading: isMunicipalityLoading, isFetching: isMunicipalityFetching } = useQuery(['getMunicipalityData', watch('province')?.value], () => GetmunicipalityData(watch('state'), watch('province')), {
        enabled: !!watch('province'),
        select: (data) => data?.data?.value,
        onSuccess: (response) => {
            const municipality = response?.matchingEntities?.map((e) => { return { "label": e?.name, "value": e?.id, ...e } })
            setMunicipalityData(municipality)
        },
        refetchOnWindowFocus: false,
    })


    const onSubmit = async (data) => {
        const FinalData = data?.municipality;
        delete FinalData?.label;
        delete FinalData?.value;
        const jsonData = JSON.stringify(FinalData, null, 2);
        const blob = new Blob([jsonData], { type: 'application/json' });
        const link = document.createElement('a');
        link.href = URL.createObjectURL(blob);
        link.download = 'address_data.json';
        document.body.appendChild(link);
        link.click();
        document.body.removeChild(link);
    }

    return (
        <>
            {(isFetchingStateData || isLoadingStateData) && <Loader />}
            <h2 className='mt-3'>Selezionare Stato, Provincia e Comune</h2>
            <h5 className='fw-normal'>ID richiesta: 12345</h5>
            <form className='step-one mt-5' autoComplete='off' onSubmit={handleSubmit(onSubmit)}>
                <div className='row'>
                    <div className='col' >
                        <div className='form-group'>
                            <label className='active' htmlFor='input-state'>Stato</label>
                            <Controller
                                name='state'
                                control={control}
                                rules={{
                                    required: {
                                        value: true,
                                        message: 'Seleziona lo stato'
                                    }
                                }}
                                render={({ field: { onChange, value = [], ref } }) => (
                                    <Select
                                        ref={ref}
                                        id='input-state'
                                        value={value}
                                        aria-label='Stato'
                                        isSearchable={true}
                                        options={stateData}
                                        placeholder='Seleziona Stato..'
                                        className={`react-select border-0`}
                                        classNamePrefix='select'
                                        closeMenuOnSelect={true}
                                        onChange={(e) => {
                                            onChange(e);
                                            setValue('municipality', '')
                                            setValue('province', '');
                                        }}
                                    />
                                )}
                            />
                            {errors.state && (
                                <div className='input-error'>
                                    {errors.state.message}
                                </div>
                            )}
                        </div>
                    </div>
                </div>

                <div className='mt-3 row'>
                    <div className='col' >
                        <div className='form-group'>
                            <label className='active' htmlFor='input-province'>Provincia</label>
                            <Controller
                                name='province'
                                control={control}
                                rules={{
                                    required: {
                                        value: true,
                                        message: 'Seleziona la provincia'
                                    }
                                }}
                                render={({ field: { onChange, value = [], ref } }) => (
                                    <Select
                                        ref={ref}
                                        id='input-province'
                                        value={value}
                                        aria-label='Provincia'
                                        isSearchable={true}
                                        options={provinceData}
                                        isDisabled={!watch('state')}
                                        isLoading={isProvinceLoading || isProvinceFetching}
                                        placeholder='Seleziona Provincia..'
                                        className={`react-select border-0`}
                                        classNamePrefix='select'
                                        closeMenuOnSelect={true}
                                        onChange={(e) => {
                                            onChange(e);
                                            setValue('municipality', '')
                                        }}
                                    />
                                )}
                            />
                            {errors.province && (
                                <div className='input-error'>
                                    {errors.province.message}
                                </div>
                            )}
                        </div>
                    </div>
                </div>

                <div className='row mt-3'>
                    <div className='col' >
                        <div className='form-group'>
                            <label className='active' htmlFor='input-municipality'>Comune</label>
                            <Controller
                                name='municipality'
                                control={control}
                                rules={{
                                    required: {
                                        value: true,
                                        message: 'Seleziona Comune'
                                    }
                                }}
                                render={({ field: { onChange, value = [], ref } }) => (
                                    <Select
                                        ref={ref}
                                        id='input-municipality'
                                        value={value}
                                        aria-label='Comune'
                                        isSearchable={true}
                                        options={municipalityData}
                                        isLoading={isMunicipalityLoading || isMunicipalityFetching}
                                        isDisabled={!watch('province')}
                                        placeholder='Seleziona Comune..'
                                        className={`react-select border-0 `}
                                        classNamePrefix='select'
                                        closeMenuOnSelect={true}
                                        onChange={(e) => {
                                            onChange(e)
                                        }}
                                    />
                                )}
                            />
                            {errors.municipality && (
                                <div className='input-error'>
                                    {errors.municipality.message}
                                </div>
                            )}
                        </div>
                    </div>
                </div>

                <div className='mb-5 d-flex justify-content-between'>
                    <button type="button" onClick={() => reset({})} className="btn btn-outline-secondary btn-xs"><span className='me-1'><LeftArrowIcon /></span>Indietro</button>
                    <button type="submit" className="btn btn-primary btn-xs"> Prosegui <span className='ms-1'><RightArrowIcon /></span></button>
                </div>
            </form >

        </>
    )
}

export default SelectAddress