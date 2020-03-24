/*
 * Copyright 2020 Adobe. All rights reserved.
 * This file is licensed to you under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License. You may obtain a copy
 * of the License at http://www.apache.org/licenses/LICENSE-2.0
 * 
 * Unless required by applicable law or agreed to in writing, software distributed under
 * the License is distributed on an "AS IS" BASIS, WITHOUT WARRANTIES OR REPRESENTATIONS
 * OF ANY KIND, either express or implied. See the License for the specific language
 * governing permissions and limitations under the License.
 */

import AlertMedium from '@spectrum-icons/ui/AlertMedium';
import ChevronDownMedium from '@spectrum-icons/ui/ChevronDownMedium';
import {classNames, dimensionValue, filterDOMProps, SlotProvider, unwrapDOMRef, useDOMRef, useMediaQuery, useStyleProps} from '@react-spectrum/utils';
import {DOMRef, DOMRefValue, FocusableRefValue, LabelPosition} from '@react-types/shared';
import {FieldButton} from '@react-spectrum/button';
import {FocusScope} from '@react-aria/focus';
import {Label} from '@react-spectrum/label';
import labelStyles from '@adobe/spectrum-css-temp/components/fieldlabel/vars.css';
import {ListBoxBase, useListBoxLayout} from '@react-spectrum/listbox';
import {mergeProps} from '@react-aria/utils';
import {Overlay, Popover, Tray} from '@react-spectrum/overlays';
import {Placement} from '@react-types/overlays';
import React, {ReactElement, useLayoutEffect, useRef, useState} from 'react';
import {SpectrumPickerProps} from '@react-types/select';
import styles from '@adobe/spectrum-css-temp/components/dropdown/vars.css';
import {Text} from '@react-spectrum/typography';
import {useFormProps} from '@react-spectrum/form';
import {useOverlayPosition} from '@react-aria/overlays';
import {useProviderProps} from '@react-spectrum/provider';
import {useSelect} from '@react-aria/select';
import {useSelectState} from '@react-stately/select';

function Picker<T>(props: SpectrumPickerProps<T>, ref: DOMRef<HTMLDivElement>) {
  props = useProviderProps(props);
  props = useFormProps(props);
  let {
    isDisabled,
    direction = 'bottom',
    align = 'start',
    shouldFlip = true,
    placeholder = 'Select an item',
    validationState,
    isQuiet,
    label,
    labelPosition = 'top' as LabelPosition,
    labelAlign,
    isRequired,
    necessityIndicator,
    menuWidth
  } = props;

  let {styleProps} = useStyleProps(props);
  let state = useSelectState(props);
  let domRef = useDOMRef(ref);

  let containerRef = useRef<DOMRefValue<HTMLDivElement>>();
  let popoverRef = useRef<HTMLDivElement>();
  let triggerRef = useRef<FocusableRefValue<HTMLElement>>();

  // We create the listbox layout in Picker and pass it to ListBoxBase below
  // so that the layout information can be cached even while the listbox is not mounted.
  // We also use the layout as the keyboard delegate for type to select.
  let layout = useListBoxLayout(state);
  let {labelProps, triggerProps, menuProps} = useSelect({
    ...props,
    triggerRef: unwrapDOMRef(triggerRef),
    keyboardDelegate: layout
  }, state);

  let {overlayProps, placement} = useOverlayPosition({
    containerRef: unwrapDOMRef(containerRef),
    targetRef: unwrapDOMRef(triggerRef),
    overlayRef: popoverRef,
    placement: `${direction} ${align}` as Placement,
    shouldFlip: shouldFlip,
    isOpen: state.isOpen
  });

  // On small screen devices, the listbox is rendered in a tray, otherwise a popover.
  let isMobile = useMediaQuery('(max-width: 700px)');
  let listbox = (
    <FocusScope restoreFocus>
      <ListBoxBase
        {...menuProps}
        autoFocus
        wrapAround
        selectOnPressUp
        focusOnPointerEnter
        focusStrategy={state.focusStrategy}
        layout={layout}
        state={state}
        width={isMobile ? '100%' : undefined} />
    </FocusScope>
  );

  // Measure the width of the button to inform the width of the menu (below).
  let [buttonWidth, setButtonWidth] = useState(null);
  useLayoutEffect(() => {
    if (!isMobile) {
      let width = triggerRef.current.UNSAFE_getDOMNode().offsetWidth;
      setButtonWidth(width);
    }
  }, [isMobile, triggerRef, state.selectedKey]);

  let overlay;
  if (isMobile) {
    overlay = (
      <Tray isOpen={state.isOpen} onClose={() => state.setOpen(false)}>
        {listbox}
      </Tray>
    );
  } else {
    // If quiet, use the default width, otherwise match the width of the button. This can be overridden by the menuWidth prop.
    // Always have a minimum width of the button width. When quiet, there is an extra offset to add.
    let width = isQuiet ? null : buttonWidth;
    let style = {
      ...overlayProps.style,
      width: menuWidth ? dimensionValue(menuWidth) : width,
      minWidth: isQuiet ? `calc(${buttonWidth}px + calc(2 * var(--spectrum-dropdown-quiet-offset)))` : buttonWidth
    };

    overlay = (
      <Popover 
        {...overlayProps}
        style={style}
        className={classNames(styles, 'spectrum-Dropdown-popover', {'spectrum-Dropdown-popover--quiet': isQuiet})}
        ref={popoverRef}
        placement={placement}
        hideArrow
        onClose={() => state.setOpen(false)}>
        {listbox}
      </Popover>
    );
  }

  // Get the selected item to render in the field button
  let selectedItem = state.selectedKey
    ? state.collection.getItem(state.selectedKey)
    : null;

  let contents = selectedItem ? selectedItem.rendered : placeholder;
  if (typeof contents === 'string') {
    contents = <Text>{contents}</Text>;
  }

  let picker = (
    <div
      className={
        classNames(
          styles,
          'spectrum-Dropdown',
          {
            'is-invalid': validationState === 'invalid',
            'is-disabled': isDisabled,
            'spectrum-Dropdown--quiet': isQuiet
          }
        )
      }>
      <FieldButton
        {...filterDOMProps(props)}
        {...triggerProps}
        ref={triggerRef}
        isActive={state.isOpen}
        isQuiet={isQuiet}
        isDisabled={isDisabled}
        validationState={validationState}
        UNSAFE_className={classNames(styles, 'spectrum-Dropdown-trigger')}>
        <SlotProvider
          slots={{
            icon: {UNSAFE_className: classNames(styles, 'spectrum-Icon'), size: 'S'},
            text: {UNSAFE_className: classNames(
            styles,
            'spectrum-Dropdown-label',
            {'is-placeholder': !selectedItem}
          )},
            description: {
              isHidden: true
            }
          }}>
          {contents}
        </SlotProvider>
        {validationState === 'invalid' && 
          <AlertMedium UNSAFE_className={classNames(styles, 'spectrum-Dropdown-invalidIcon')} />
        }
        <ChevronDownMedium UNSAFE_className={classNames(styles, 'spectrum-Dropdown-chevron')} />
      </FieldButton>
      <Overlay isOpen={state.isOpen} ref={containerRef}>
        {overlay}
      </Overlay>
    </div>
  );

  if (label) {
    let labelWrapperClass = classNames(
      labelStyles,
      'spectrum-Field',
      {
        'spectrum-Field--positionTop': labelPosition === 'top',
        'spectrum-Field--positionSide': labelPosition === 'side'
      },
      classNames(
        styles,
        'spectrum-Field',
        {'spectrum-Dropdown-fieldWrapper--quiet': isQuiet}
      ),
      styleProps.className
    );

    picker = React.cloneElement(picker, mergeProps(picker.props, {
      className: classNames(labelStyles, 'spectrum-Field-field')
    }));

    return (
      <div 
        {...styleProps}
        ref={domRef}
        className={labelWrapperClass}>
        <Label
          {...labelProps}
          labelPosition={labelPosition}
          labelAlign={labelAlign}
          isRequired={isRequired}
          necessityIndicator={necessityIndicator}
          elementType="span">
          {label}
        </Label>
        {picker}
      </div>
    );
  }

  return React.cloneElement(picker, mergeProps(picker.props, {
    ...styleProps,
    ref: domRef
  }));
}

// forwardRef doesn't support generic parameters, so cast the result to the correct type
// https://stackoverflow.com/questions/58469229/react-with-typescript-generics-while-using-react-forwardref
const _Picker = React.forwardRef(Picker) as <T>(props: SpectrumPickerProps<T> & {ref?: DOMRef<HTMLDivElement>}) => ReactElement;
export {_Picker as Picker};