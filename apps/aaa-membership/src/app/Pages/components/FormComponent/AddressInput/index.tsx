 
import { Box, Grid, Link } from '@mui/material';
import { useEffect, useMemo, useState } from 'react';
import Autocomplete from 'react-google-autocomplete';
import { useFormContext, useWatch } from 'react-hook-form';
import { QuestionDescription, QuestionHeader, markFieldPathDirty } from '..';
 
import { extractStreetAddress } from './extractStreetAddress';
import {
 
  getGoogleAddressOption,
  getValueFromGoogleAddressObject,
} from './googlePlaceHelper';
 
export const RestAddress = (props:  IFormTextInputProps): JSX.Element => {
  const { parentAccessor, title, helpInfo, auOnly, disabled, isPreview } =
    props;

  const GoogleApiKey = process.env['NX_PUBLIC_GOOGLE_MAP_API_KEY'];

  const { getValues, setValue, control, getFieldState } = useFormContext();
  const { getResourceByPath } = useResourceContext();
  // only setup init value once when get value and accessor passed in
  const initFormattedAddress = useMemo(() => {
    //If it is formatted address then addressLine 1, otherwise combine to full address
    return addressToString(getValues(parentAccessor));
  }, [getValues, parentAccessor]);

  const [states, setStates] = useState<ICountryState[]>([]);

  const isAddressManuallyInputWatch = useWatch({
    control,
    name: `${parentAccessor}.isManuallyInput`,
  });

  const countryWatch = useWatch({
    control,
    name: `${parentAccessor}.country`,
  });

  const entireAddressWatch = useWatch({
    control,
    name: [
      `${parentAccessor}.country`,
      `${parentAccessor}.postcode`,
      `${parentAccessor}.suburb`,
      `${parentAccessor}.state`,
      `${parentAccessor}.addressLine1`,
    ],
  });
  const addressMatchOption = getGoogleAddressOption(auOnly);

  useEffect(() => {
    const statesFromCountry = CountryAndState.filter(
      (x) => x.groupCode === (auOnly ? 'AU' : countryWatch),
    );
    setStates(statesFromCountry);
    //If state not inside state list anymore, reset, but if no states available for the country, skip
    if (
      statesFromCountry.length > 0 &&
      statesFromCountry
        .map((x) => x.value)
        .indexOf(getValues(`${parentAccessor}.state`)) < 0
    ) {
      setValue(`${parentAccessor}.state`, '', {
        shouldValidate: false,
        shouldDirty: false,
      });
    }
    if (countryWatch?.toUpperCase() === 'AU') {
      setValue(
        `${parentAccessor}.postcode`,
        (getValues(`${parentAccessor}.postcode`) || '')
          .replace(/\D/g, '')
          .substring(0, 4),
      );
    }
    // eslint-disable-next-line
  }, [countryWatch, auOnly]);

  const setAddress = (place: any) => {
    if (place?.address_components && place?.address_components.length > 0) {
      const _country = auOnly
        ? 'AU'
        : getValueFromGoogleAddressObject(place, ['country']);
      const _state = getValueFromGoogleAddressObject(place, [
        'administrative_area_level_1',
      ]);
      const _suburb = getValueFromGoogleAddressObject(place, ['locality']);
      const _postcode = getValueFromGoogleAddressObject(place, [
        'postal_code_suffix',
        'postal_code',
      ]);
      const streetAddress = extractStreetAddress(
        place?.formatted_address,
        _country,
        _state,
        _postcode,
        _suburb,
      );
      // Cut the address from end

      setValue(
        `${parentAccessor}`,
        {
          formattedAddress: place?.formatted_address,
          addressLine1: streetAddress,
          country: _country,
          state: _state,
          suburb: _suburb,
          postcode: _postcode,
          //geometry :{location {lat: 34.050036, lng: -117.2638456}}

          lat: place.geometry?.location?.lat(),
          lng: place.geometry?.location?.lng(),
        },
        { shouldDirty: true, shouldValidate: true },
      );
      markFieldPathDirty(parentAccessor, setValue, getValues('dirtyUIFields'));
    }
  };

  //formatted address update when it is manually input and any change in address
  useEffect(() => {
    if (isAddressManuallyInputWatch) {
      //console.log('isAddressManuallyInputWatch', isAddressManuallyInputWatch);
      setValue(`${parentAccessor}.formattedAddress`, '');
    }
  }, [entireAddressWatch]);

  if (isPreview)
    //Only address, need convert country from code to name, reuse selector wrapper to make sure ref data get ready before render
    return <AddressPreview {...props} />;

  return (
    <Grid container columnSpacing={2} rowSpacing={0} mt={0}>
      <Grid item xs={12}>
        <Box
          sx={{
            flexGrow: 1,
            paddingBottom: '3px',
            '.google-address-input': {
              font: 'inherit',
              px: 2,
              py: 1,
              borderRadius: (theme) => theme.spacing(0.5),
              width: '100%',
              border: '1px solid rgba(0, 0, 0, 0.23)',
            },
            '& .google-address-input:hover': {
              border: '1px solid #000',
            },
            '& .google-address-input:focus': {
              border: '2px solid #000',
              outline: 'none',
              //Todo all input should have same focus
              //via css better ?
              boxShadow: `0 0 0 3px #33c5b4`,
              //  borderColor: theme.palette.secondary.main,
            },
          }}
        >
          <QuestionHeader
            {...props}
            title={title || 'Postal address'}
            helpInfo={helpInfo}
          ></QuestionHeader>
          {!disabled && !isAddressManuallyInputWatch && (
            <>
              <QuestionDescription>
                Type ahead to search address
              </QuestionDescription>
              <label
                htmlFor={`${parentAccessor} address`}
                style={{ display: 'none' }}
              >
                {getResourceByPath('common.address.searchTitle') as string}
              </label>
              <Autocomplete
                className="google-address-input"
                placeholder={
                  getResourceByPath(
                    'common.address.placeHolderForSearch',
                  ) as string
                }
                id={`${parentAccessor} address`}
                data-cy={`${parentAccessor} address`}
                apiKey={GoogleApiKey}
                options={addressMatchOption}
                onKeyDown={keyDownHandleIgnoreEnter}
                onPlaceSelected={(place) => setAddress(place)}
                defaultValue={''}
              />
            </>
          )}
        </Box>

        {getFieldState(parentAccessor).invalid && (
          <FormErrorMsg>{ErrorMessages.requiredToSelectAddress}</FormErrorMsg>
        )}
      </Grid>
      {!disabled && !isAddressManuallyInputWatch && (
        <Grid item sx={{ p: 2 }} xs={12}>
          <Link
            onClick={() => setValue(`${parentAccessor}.isManuallyInput`, true)}
            id={`link-enter-address-${parentAccessor}`}
            data-cy={`link-enter-address-${parentAccessor}`}
          >
            {getResourceByPath('common.address.switchToManual') as string}
          </Link>
        </Grid>
      )}
      {!isAddressManuallyInputWatch && (
        <Grid item sx={{ px: 2 }} xs={12}>
          {/* <InfoCard variant="info"> */}
          <AddressPreview {...props} title="Selected address" />
          {/* </InfoCard> */}
        </Grid>
      )}
      {isAddressManuallyInputWatch && (
        <>
          <Grid item xs={12}>
            <RestInputText
              accessor={`${parentAccessor}.addressLine1`}
              label={
                getResourceByPath('common.address.streetAddress') as string
              }
              fullWidth
              disabled={disabled}
              maxLength={240}
            />
          </Grid>
          {!auOnly && (
            <Grid item xs={12}>
              <RestSelectorWrapper
                accessor={`${parentAccessor}.country`}
                label={getResourceByPath('common.address.country') as string}
                disabled={auOnly || disabled}
                refDatasetName={EnumRefDataset.Country}
                selectorType={EnumSelectorType.AUTO_COMPLETE}
              />
            </Grid>
          )}

          <Grid item xs={12} sm={6}>
            {states.length <= 0 && (
              <RestInputText
                accessor={`${parentAccessor}.state`}
                label={getResourceByPath('common.address.state') as string}
                fullWidth
                disabled={disabled}
                maxLength={35}
              />
            )}
            {states.length > 0 && (
              <RestSelectorWrapper
                accessor={`${parentAccessor}.state`}
                label={getResourceByPath('common.address.state') as string}
                fixedOptions={convertStateToSelectOption(states)}
                selectorType={EnumSelectorType.AUTO_COMPLETE}
                disabled={disabled}
              />
            )}
          </Grid>
          <Grid item xs={12} sm={6}>
            <RestInputText
              accessor={`${parentAccessor}.suburb`}
              label={getResourceByPath('common.address.suburb') as string}
              fullWidth
              maxLength={100}
              disabled={disabled}
            />
          </Grid>
          <Grid item xs={12} sm={6}>
            {countryWatch?.toUpperCase() === 'AU' && (
              <RestInputText
                accessor={`${parentAccessor}.postcode`}
                label={getResourceByPath('common.address.postcode') as string}
                fullWidth
                pattern={'####'}
                disabled={disabled}
              />
            )}
            {countryWatch?.toUpperCase() !== 'AU' && (
              <RestInputText
                accessor={`${parentAccessor}.postcode`}
                label={getResourceByPath('common.address.postcode') as string}
                fullWidth
                maxLength={20}
                disabled={disabled}
              />
            )}
          </Grid>
        </>
      )}
      {!disabled && isAddressManuallyInputWatch && (
        <Grid item sx={{ p: 2 }} xs={12}>
          <Link
            onClick={() => setValue(`${parentAccessor}.isManuallyInput`, false)}
            id={`link-search-address-${parentAccessor}`}
          >
            {getResourceByPath('common.address.switchToSearch') as string}
          </Link>
        </Grid>
      )}
    </Grid>
  );
};
