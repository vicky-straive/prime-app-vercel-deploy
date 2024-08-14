'use client';

import React, { useState, useEffect } from 'react';
import AspectRatio from '@mui/joy/AspectRatio';
import Card from '@mui/joy/Card';
import CardContent from '@mui/joy/CardContent';
import CardOverflow from '@mui/joy/CardOverflow';
import Divider from '@mui/joy/Divider';
import Typography from '@mui/joy/Typography';
import type { Demo } from '@/types';
import { DataView, DataViewLayoutOptions } from 'primereact/dataview';
import { FileService } from '../../../../demo/service/FileService';
import { Dropdown, DropdownChangeEvent } from 'primereact/dropdown';
import { InputText } from 'primereact/inputtext';

export default function MultipleInteractionCard() {
    const [dataViewValue, setDataViewValue] = useState<Demo.Files[]>([]);
    const [globalFilterValue, setGlobalFilterValue] = useState('');
    const [filteredValue, setFilteredValue] = useState<Demo.Files[] | null>(null);
    const [layout, setLayout] = useState<'grid' | 'list' | (string & Record<string, unknown>)>('grid');
    const [sortKey, setSortKey] = useState(null);
    const [sortOrder, setSortOrder] = useState<0 | 1 | -1 | null>(null);
    const [sortField, setSortField] = useState('');

    const sortOptions = [
        { label: 'Date Recent to Start', value: '!date' },
        { label: 'Date Start to Recent', value: 'date' }
    ];

    useEffect(() => {
        FileService.getUploadedFiles().then((data) => setDataViewValue(data));
        setGlobalFilterValue('');
    }, []);

    useEffect(() => {
        FileService.getUploadedFiles().then((data) => setDataViewValue(data));
        setGlobalFilterValue('');
    }, []);

    const onFilter = (e: React.ChangeEvent<HTMLInputElement>) => {
        const value = e.target.value;
        setGlobalFilterValue(value);
        if (value.length === 0) {
            setFilteredValue(null);
        } else {
            const filtered = dataViewValue?.filter((file) => {
                const productNameLowercase = file.name?.toLowerCase() ?? '';
                const searchValueLowercase = value.toLowerCase();
                return productNameLowercase.includes(searchValueLowercase);
            });

            setFilteredValue(filtered);
        }
    };

    const onSortChange = (event: DropdownChangeEvent) => {
        const value = event.value;

        if (value.indexOf('!') === 0) {
            setSortOrder(-1);
            setSortField(value.substring(1, value.length));
            setSortKey(value);
        } else {
            setSortOrder(1);
            setSortField(value);
            setSortKey(value);
        }
    };

    const dataViewHeader = (
        <div className="flex flex-column md:flex-row md:justify-content-between gap-2">
            <Dropdown value={sortKey} options={sortOptions} optionLabel="label" placeholder="Sort By Date" onChange={onSortChange} />
            <span className="p-input-icon-left">
                <i className="pi pi-search" />
                <InputText value={globalFilterValue} onChange={onFilter} placeholder="Search by Name" />
            </span>
            <DataViewLayoutOptions layout={layout} onChange={(e) => setLayout(e.value)} />
        </div>
    );
    console.log('dataval', dataViewValue);

    const dataviewListItem = (data: Demo.Files) => {
        return (
            <div className="col-12">
                <div className="flex flex-column md:flex-row align-items-center p-3 w-full">
                    <img src={`/demo/images/product/${data.image}`} alt={data.name} className="my-4 md:my-0 w-9 md:w-10rem shadow-2 mr-5" />
                    <div className="flex-1 flex flex-column align-items-center text-center md:text-left">
                        <div className="font-bold text-2xl">{data.name}</div>
                        <div className="mb-2">{data.description}</div>
                        <div className="flex align-items-center">
                            <i className="pi pi-tag mr-2"></i>
                            {/* <span className="font-semibold">{data.category}</span> */}
                        </div>
                    </div>
                    <div className="flex flex-row md:flex-column justify-content-between w-full md:w-auto align-items-center md:align-items-end mt-5 md:mt-0">
                        <span className="text-2xl font-semibold mb-2 align-self-center md:align-self-end">{data.date}</span>
                        {/* <Button icon="pi pi-shopping-cart" label="Add to Cart" disabled={data.inventoryStatus === 'OUTOFSTOCK'} size="small" className="mb-2"></Button> */}
                        {/* <span className={`product-badge status-${data.inventoryStatus?.toLowerCase()}`}>{data.inventoryStatus}</span> */}
                    </div>
                </div>
            </div>
        );
    };

    const dataviewGridItem = (data: Demo.Files) => {
        return (
            <div className="col-12 lg:col-3">
                <div className="card m-3 border-1 surface-border">
                <img src={data.image?.url} alt={data.name} className="my-4 md:my-0 w-9 md:w-10rem shadow-2 mr-5" />
                    <div className="flex flex-wrap gap-2 align-items-center justify-content-between mb-2">
                        <div className="flex align-items-center">
                        </div>
                    </div>
                    <div className="flex flex-column align-items-center text-center mb-3"></div>
                    <div className="text-xl font-bold">{data.name}</div>
                    <div className="flex align-items-center justify-content-between">
                        <span className="text-2s">{data.date}</span>
                    </div>
                </div>
            </div>
        );
    };

    const itemTemplate = (data: Demo.Files, layout: 'grid' | 'list' | (string & Record<string, unknown>)) => {
        if (!data) {
            return;
        }
        if (layout === 'list') {
            return dataviewListItem(data);
        } else if (layout === 'grid') {
            return dataviewGridItem(data);
        }
    };

    return (
        <div className="grid">
        <div className="col-12">
            <div className="card">
                {/* <h5>DataView</h5> */}
                <DataView value={filteredValue || dataViewValue} layout={layout} paginator rows={12} sortOrder={sortOrder} sortField={sortField} itemTemplate={itemTemplate} header={dataViewHeader}></DataView>
            </div>
        </div>
    </div>
    );
}
