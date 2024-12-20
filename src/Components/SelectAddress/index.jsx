import React, { useEffect, useState } from 'react'
import { Controller, useForm } from 'react-hook-form';
import Select from 'react-select';
import { LeftArrowIcon, RightArrowIcon } from '../../Assets/SVGs';
import { useQuery } from 'react-query';
import { GetmunicipalityData, Getprovince, Getstate } from '../../Query/SelectAdress/selectAdress.query';
import { Loader } from '../Loader';
// import { Collapse } from 'bootstrap-italia';

function SelectAddress() {
    const [stateData, setStateData] = useState([])
    const [provinceData, setProvinceData] = useState([])
    const [municipalityData, setMunicipalityData] = useState([])
    const [queryParams, setQueryParams] = useState({});
    const [queryParamsInput, setQueryParamsInput] = useState({});
    const [formLoading, setFormLoading] = useState(false);
    const { control, formState: { errors }, watch, reset, setValue } = useForm({ mode: 'onSubmit', defaultValues: queryParams });

    useEffect(() => {
        const params = new URLSearchParams(window.location.search);
        const paramsObj = {};
        const noChangeInputParams = {};

        const regex = /^COL.{4}$/;

        params.forEach((value, key) => {
            if (regex.test(value)) {
                paramsObj[key] = value;
            } else {
                noChangeInputParams[key] = value;
            }
        });

        setQueryParams(paramsObj);
        setQueryParamsInput(noChangeInputParams);

    }, []);

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

    // const onSubmit = async (data) => {
    //     console.log('data', data)
    //     let FinalData = data
    //     if (data?.state?.itName === "Italia") {
    //         delete FinalData?.state
    //         delete FinalData?.province
    //         const municipalityData = data?.municipality
    //         delete FinalData?.municipality
    //         FinalData = { ...FinalData, ...municipalityData };
    //         delete FinalData?.label;
    //         delete FinalData?.value;
    //     } else {
    //         FinalData = data;
    //     }
    //     console.log('FinalData', FinalData)
    //     const jsonData = JSON.stringify(FinalData, null, 2);
    //     const blob = new Blob([jsonData], { type: 'application/json' });
    //     const link = document.createElement('a');
    //     link.href = URL.createObjectURL(blob);
    //     link.download = 'address_data.json';
    //     document.body.appendChild(link);
    //     link.click();
    //     document.body.removeChild(link);
    // }


    useEffect(() => {
        if (watch('state')?.label !== "Italia" && watch('state') !== undefined) {
            setValue('province', 'EE')
            if (queryParams.province) {
                setValue(queryParams?.province, "EE")
            }
        }
    }, [watch('state')])

    function logFormData() {

        // e.preventDefault();
        setFormLoading(true);
        return true;
    }

    function encodeToISO88591(data) {
        // Encode data to ISO-8859-1
        if (data) { return unescape(encodeURIComponent(data)); } else { return "" }
    }

    // function decodeFromISO88591(data) {
    //     // Decode data from ISO-8859-1 to UTF-8
    //     if (data) { return decodeURIComponent(escape(data)); } else { return "" }
    // }


    // const originalText = "Café";
    const originalText = "Antey-Saint-AndrÃ¨";
    // const originalText = "Antey-Saint-Andrè";

    const encodedText = encodeToISO88591(originalText);
    console.log("Encoded to ISO-8859-1:", encodedText);

    // const decodedText = decodeFromISO88591(encodedText);
    // console.log("Decoded back to UTF-8:", decodedText);




    return (
        <>
            {(isFetchingStateData || isLoadingStateData || formLoading) && <Loader />}
            <h2 className='mt-3'>Selezionare Stato, Provincia e Comune</h2>
            <h5 className='fw-normal'>ID richiesta: 12345</h5>
            <form className='step-one mt-5' id="CWF-form" autoComplete='off' onSubmit={(e) => logFormData(e)} method="post" action='https://developer01.elixdev.it/rwe2/ComeBackToElixAndSave' acceptCharset="ISO-8859-1">
                {Object.entries(queryParams).map(([key, Value]) => {
                    const regex = /^COL.{4}$/;
                    if (regex.test(Value)) {
                        return <Controller
                            name={Value}
                            key={key}
                            control={control}
                            render={({ field: { onChange, value } }) => (
                                <input
                                    id={Value}
                                    name={Value}
                                    type="hidden"
                                    onChange={onChange}
                                    value={value}
                                // onChange={(e) => {
                                //     console.log('e.target.value', e.target.value)
                                //     const encodedValue = encodeToISO88591(e.target.value);
                                //     onChange(encodedValue); // Update the form state with the encoded value
                                // }}
                                // value={encodeToISO88591(value)}
                                />
                            )}
                        />
                    }
                })}

                {Object.entries(queryParamsInput).map(([key, Value]) => {
                    const regex = /^COL.{4}$/;
                    if (!regex.test(Value) && !regex.test(key)) {
                        return <Controller
                            name={key}
                            key={key}
                            control={control}
                            render={({ field: { onChange } }) => (
                                <input
                                    id={key}
                                    name={key}
                                    type="hidden"
                                    onChange={onChange}
                                    value={Value}
                                />
                            )}
                        />
                    }
                })}

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
                                            if (queryParams && queryParams.state) {
                                                setValue(queryParams?.state, e?.label)
                                                setValue(queryParams?.stateCode, e?.value)
                                                setValue(queryParams?.province, "")
                                                setValue(queryParams?.municipality, "")
                                                setValue(queryParams?.municipalityCode, "")
                                                setValue(queryParams?.municipalityJson, "")
                                            }

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
                                                onChange(e);
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
                                                    if (queryParams && queryParams.province) {
                                                        setValue(queryParams?.province, e?.label)
                                                        setValue(queryParams?.municipality, '')
                                                        setValue(queryParams?.municipalityCode, '')
                                                        setValue(queryParams?.municipalityJson, '')
                                                    }
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
                                                onChange(e);
                                                if (queryParams && queryParams.municipality) {
                                                    setValue(queryParams?.municipality, e.target.value)
                                                    const Time = new Date().toLocaleTimeString([], { hour12: false });
                                                    const Day = new Date().toLocaleDateString('en-GB').replace(/\//g, '-');
                                                    const FinalMunicipalityJSON = {
                                                        "restService": {
                                                            "result": {
                                                                "value": { itName: e.target.value, name: e.target.value }
                                                            },
                                                            "invocation": {
                                                                "date": {
                                                                    "time": Time,
                                                                    "date": Day
                                                                }
                                                            }
                                                        }
                                                    }
                                                    setValue(queryParams?.municipalityJson, JSON.stringify(FinalMunicipalityJSON));

                                                }
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
                                                const Time = new Date().toLocaleTimeString([], { hour12: false });
                                                const Day = new Date().toLocaleDateString('en-GB').replace(/\//g, '-');
                                                if (queryParams && queryParams.municipality) {
                                                    setValue(queryParams?.municipality, e?.label)
                                                    setValue(queryParams?.municipalityCode, e?.value)
                                                    const municipalityJsonobj = e;
                                                    delete municipalityJsonobj.label
                                                    delete municipalityJsonobj.value

                                                    const FinalMunicipalityJSON = {
                                                        "restService": {
                                                            "result": {
                                                                "value": municipalityJsonobj
                                                            },
                                                            "invocation": {
                                                                "date": {
                                                                    "time": Time,
                                                                    "date": Day
                                                                }
                                                            }
                                                        }
                                                    }
                                                    setValue(queryParams?.municipalityJson, JSON.stringify(FinalMunicipalityJSON));
                                                    const temp = JSON.stringify(FinalMunicipalityJSON);
                                                    const temp2 = JSON.parse(temp);
                                                    console.log(temp2)
                                                }
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
                    <button type="submit" form="CWF-form" className="btn btn-primary btn-xs"> Prosegui <span className='ms-1'><RightArrowIcon /></span></button>
                </div>
            </form >

        </>
    )
}

export default SelectAddress