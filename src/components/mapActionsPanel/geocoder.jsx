import { useEffect, useState } from 'react';
import {
    recoilMapCenter
} from '../../state/map.state';
import { 
    Autocomplete,
    TextField
} from '@mui/material';
import { debounce } from '@mui/material/utils';
import { Search } from '@mui/icons-material';
import { Box } from '@mui/system';
import { useRecoilState } from 'recoil';

const accessToken = 'pk.eyJ1IjoiZGVwdG9mamVmZmF5ZXIiLCJhIjoiY2w0ZDFpaGF3MDJyYzNqcDlrZzZsbWtxbiJ9.hoxdS073M8KEb67OMxmXrg';

const Geocoder = () => {

    const [value, setValue] = useState(null);
    const [focus, setFocus] = useState(false);
    const [inputValue, setInputValue] = useState('');
    const [options, setOptions] = useState([]);

	const [mapCenter, setMapCenter] = useRecoilState(recoilMapCenter);

    useEffect(() => {
        if (inputValue !== '') {
            const API = `https://api.mapbox.com/geocoding/v5/mapbox.places/${inputValue}.json?access_token=${accessToken}`;

            debounce(fetch(API)
                .then((response) => response.json())
                .then((data) => {
                    setOptions(data.features);
                })
                , 400);
        }
    }, [value, inputValue]);

    return (
        <div className={`geocoder ${focus ? 'geocoder--focused' : ''}`} tabIndex={0}>
            <Autocomplete 
                autoComplete
                includeInputInList
                filterSelectedOptions
                className='geocoder__search'
                options={options}
                value={value}
                filterOptions={(x) => x}
                getOptionLabel={(option) => typeof option === 'string' ? option : option.place_name}
                onInputChange={(e, val) => {
                    setInputValue(val);
                }}
                onChange={(e, val) => {
                    if (val) {
                        setMapCenter(val.center);
                    }
                    setFocus(false);
                    setOptions(val ? [val, ...options] : options);
                    setValue(val);
                }}
                sx={{backgroundColor: 'none'}}
                noOptionsText='No locations'
                isOptionEqualToValue={(option) => option.place_name}
                renderInput={(params) => {
                    return (
                        <div ref={params.InputProps.ref}>
                            <Box className='geocoder__search-icon'>
                                <Search />
                            </Box>
                            <TextField 
                                {...params} 
                                className='geocoder__search-input'
                                InputLabelProps={{
                                    style: {
                                        left: '28px'
                                    }
                                }}
                                InputProps={{
                                    ...params.InputProps,
                                    style: {
                                        paddingLeft: '36px'
                                    }
                                }}
                                label='Search locations'
                                onFocus={() => setFocus(true)}
                                onBlur={() => setFocus(false)}
                                size='small'
                                type='text'
                                variant='filled'
                            />
                        </div>
                    )
                }}
            />
        </div>
    );
}

export default Geocoder;
