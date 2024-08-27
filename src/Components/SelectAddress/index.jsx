import React, { useEffect, useState } from 'react'
import { Controller, useForm } from 'react-hook-form';
import Select from 'react-select';
import { municipalityMockData, provinceMockData, stateMockData } from '../../Utils/Data/data';
import { LeftArrowIcon, RightArrowIcon } from '../../Assets/SVGs';

function SelectAddress() {
    const { control, formState: { errors }, handleSubmit, watch } = useForm({ mode: 'onSubmit' });
    const [stateData, setStateData] = useState([])
    const [provinceData, setProvinceData] = useState([])
    const [municipalityData, setMunicipalityData] = useState([])

    const onSubmit = async (data) => {
        const FinalData = data?.municipality;
        delete FinalData?.label
        delete FinalData?.value

        // Convert the data to JSON format
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
        const stateData = stateMockData?.value?.matchingEntities?.map((element) => {
            return { "label": element?.areaName, "value": element?.areaCode, ...element }
        })
        setStateData(stateData)
    }, [])

    useEffect(() => {
        if (watch('state')) {
            const provinceData = provinceMockData?.value?.matchingEntities?.filter((element) => element?.state?.areaCode === watch('state')?.value)
                .map((e) => { return { "label": e?.geographicalPosDenom, "value": e?.geographicalPosCode, ...e } })
            setProvinceData(provinceData)
        }
        if (watch('province')) {
            const municipalityData = municipalityMockData?.value?.matchingEntities?.filter((element) => element?.province?.geographicalPosCode === watch('province')?.value)
                .map((e) => { return { "label": e?.name, "value": e?.id, ...e } })
            setMunicipalityData(municipalityData)
        }

    }, [watch('state'), watch('province')])

    return (
        <>
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
                                            onChange(e)
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
                                        placeholder='Seleziona Provincia..'
                                        className={`react-select border-0 `}
                                        classNamePrefix='select'
                                        closeMenuOnSelect={true}
                                        onChange={(e) => {
                                            onChange(e)
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
                    <button type="button" className="btn btn-outline-secondary btn-xs"><span className='me-1'><LeftArrowIcon /></span>Indietro</button>
                    <button type="submit" className="btn btn-primary btn-xs"> Prosegui <span className='ms-1'><RightArrowIcon /></span></button>
                </div>
            </form >
        </>
    )
}

export default SelectAddress