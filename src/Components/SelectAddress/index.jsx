import React, { useEffect, useState } from 'react'
import { Button, Col, Form, Row } from 'react-bootstrap'
import { Controller, useForm } from 'react-hook-form';
import Select from 'react-select';
import { municipalityMockData, provinceMockData, stateMockData } from '../../Utils/Data/data';

function SelectAddress() {
    const { control, formState: { errors }, handleSubmit, watch } = useForm({ mode: 'onSubmit' });
    const [stateData, setStateData] = useState([])
    const [provinceData, setProvinceData] = useState([])
    const [municipalityData, setMunicipalityData] = useState([])

    const onSubmit = async (data) => {
        console.log('data', data)
    }


    useEffect(() => {
        const stateData = stateMockData?.value?.matchingEntities?.map((element) => {
            return { "label": element?.areaName, "value": element?.areaCode }
        })
        setStateData(stateData)
    }, [])

    useEffect(() => {
        if (watch('state')) {
            const provinceData = provinceMockData?.value?.matchingEntities?.filter((element) => element?.state?.areaCode === watch('state')?.value)
                .map((e) => { return { "label": e?.geographicalPosDenom, "value": e?.geographicalPosCode } })
            setProvinceData(provinceData)
        }
        if (watch('province')) {
            const municipalityData = municipalityMockData?.value?.matchingEntities?.filter((element) => element?.province?.geographicalPosCode === watch('province')?.value)
                .map((e) => { return { "label": e?.name, "value": e?.id } })
            setMunicipalityData(municipalityData)
        }

    }, [watch('state'), watch('province')])

    console.log('errors', errors)
    return (
        <>
            <h2 className='mt-3'>Seleziona l&#39;indirizzo</h2>
            <Form className='step-one mt-4' autoComplete='off' onSubmit={handleSubmit(onSubmit)}>
                <Row>
                    <Col >
                        <Form.Group className='form-group'>
                            <Form.Label>Stato</Form.Label>
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
                                        value={value}
                                        isSearchable={false}
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
                                <Form.Control.Feedback type='invalid'>
                                    {errors.state.message}
                                </Form.Control.Feedback>
                            )}
                        </Form.Group>
                    </Col>
                </Row>

                <Row className='mt-3'>
                    <Col >
                        <Form.Group className='form-group'>
                            <Form.Label>Provincia</Form.Label>
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
                                        value={value}
                                        isSearchable={false}
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
                                <Form.Control.Feedback type='invalid'>
                                    {errors.province.message}
                                </Form.Control.Feedback>
                            )}
                        </Form.Group>
                    </Col>
                </Row>

                <Row className='mt-3'>
                    <Col >
                        <Form.Group className='form-group'>
                            <Form.Label>Comune</Form.Label>
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
                                        value={value}
                                        isSearchable={false}
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
                                <Form.Control.Feedback type='invalid'>
                                    {errors.municipality.message}
                                </Form.Control.Feedback>
                            )}
                        </Form.Group>
                    </Col>
                </Row>

                <Row className='mt-5'>
                    <Button size='sm' variant="primary" type='submit' >
                        invia
                    </Button>
                </Row>
            </Form>
        </>
    )
}

export default SelectAddress