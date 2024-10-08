import React, { useEffect, useState } from 'react'
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
            let statesOption = response?.matchingEntities?.map((element) => {
                return { "label": element?.itName, "value": element?.minCode, ...element }
            })

            statesOption = statesOption.sort((a, b) => a.label.localeCompare(b.label));

            const italyIndex = statesOption.findIndex(option => option.label === 'Italia');
            if (italyIndex !== -1) {
                const italy = statesOption.splice(italyIndex, 1)[0];
                statesOption.unshift(italy);
            }

            setStateData(statesOption);
        },
        staleTime: 60 * 60 * 1000,
        cacheTime: 60 * 60 * 1000,
        refetchOnWindowFocus: false,
        refetchOnMount: false,
    });

    const { isLoading: isProvinceLoading, isFetching: isProvinceFetching } = useQuery(['getProvinceData', Number(watch('state')?.value)], () => Getprovince(watch('state')), {
        enabled: (!!watch('state') && watch('state')?.label === "Italia"),
        select: (data) => data?.data?.value,
        onSuccess: (response) => {
            let provinceData = response?.matchingEntities?.map((e) => { return { "label": e?.name, "value": e?.id, ...e } })
            provinceData = provinceData.sort((a, b) => a.label.localeCompare(b.label));
            setProvinceData(provinceData)
        },
        refetchOnWindowFocus: false
    })

    const { isLoading: isMunicipalityLoading, isFetching: isMunicipalityFetching } = useQuery(['getMunicipalityData', watch('province')?.value], () => GetmunicipalityData(watch('state'), watch('province')), {
        enabled: (!!watch('province') && watch('state')?.label === "Italia"),
        select: (data) => data?.data?.value,
        onSuccess: (response) => {
            let municipality = response?.matchingEntities?.map((e) => { return { "label": e?.itName, "value": e?.id, ...e } });
            municipality = municipality.sort((a, b) => a.label.localeCompare(b.label));
            setMunicipalityData(municipality)
        },
        refetchOnWindowFocus: false,
    })


    const onSubmit = async (data) => {
        let FinalData = data
        if (data?.state?.itName === "Italia") {
            FinalData = data?.municipality;
            delete FinalData?.label;
            delete FinalData?.value;
        } else {
            FinalData = data;
        }
        const jsonData = JSON.stringify(FinalData, null, 2);
        const blob = new Blob([jsonData], { type: 'application/json' });
        const link = document.createElement('a');
        link.href = URL.createObjectURL(blob);
        link.download = 'address_data.json';
        document.body.appendChild(link);
        link.click();
        document.body.removeChild(link);
    }


    useEffect(() => {
        if (watch('state')?.label !== "Italia" && watch('state') !== undefined) {
            setValue('province', 'EE')
        }
    }, [watch('state')])

    return (
        <>
            {(isFetchingStateData || isLoadingStateData) && <Loader />}
            <h2 className='mt-3'>Selezionare Stato, Provincia e Comune</h2>
            <h5 className='fw-normal'>ID richiesta: 12345</h5>
            <form className='step-one mt-5' autoComplete='off' onSubmit={handleSubmit(onSubmit)}>

                <div className='row'>
                    <div className='col'>
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
                        {(watch('state')?.label !== "Italia" && watch('state') !== undefined) ?
                            <div className="form-group">
                                <label className="active" htmlFor="formGroupExampleInput3">Provincia</label>
                                <Controller
                                    name='province'
                                    control={control}
                                    rules={{
                                        required: {
                                            value: true,
                                            message: 'Seleziona Provincia'
                                        }
                                    }}
                                    render={({ field: { onChange, value, ref } }) => (
                                        <input
                                            ref={ref}
                                            type="text"
                                            value={value}
                                            disabled
                                            className="form-control"
                                            id="formGroupExampleInput3"
                                            placeholder="Aggiungi provincia..."
                                            onChange={(e) => {
                                                onChange(e)
                                            }}
                                        />
                                    )}
                                />
                            </div>
                            : (
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
                            )}
                    </div>
                </div>

                <div className='row mt-3'>
                    <div className='col' >
                        {(watch('state')?.label !== "Italia" && watch('state') !== undefined) ?
                            <div className="form-group">
                                <label className="active" htmlFor="formGroupExampleInput2">Comune</label>
                                <Controller
                                    name='municipality'
                                    control={control}
                                    rules={{
                                        required: {
                                            value: true,
                                            message: 'Seleziona Comune'
                                        }
                                    }}
                                    render={({ field: { onChange, value, ref } }) => (
                                        <input
                                            ref={ref}
                                            type="text"
                                            value={value}
                                            className="form-control"
                                            id="formGroupExampleInput2"
                                            placeholder="Aggiungere Comune..."
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
                            :
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
                        }

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