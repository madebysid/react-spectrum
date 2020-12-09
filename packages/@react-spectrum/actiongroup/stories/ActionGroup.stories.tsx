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

import {action} from '@storybook/addon-actions';
import {ActionGroup} from '../';
import {ActionGroupBoth, ActionGroupIconOnly, ActionGroupTextOnly, iconMap} from './utils';
import {Button} from '@react-spectrum/button';
import {Flex} from '@react-spectrum/layout';
import {Item} from '@react-stately/collections';
import {Meta, Story} from '@storybook/react';
import React from 'react';
import {SpectrumActionGroupProps} from '@react-types/actiongroup';
import {Tooltip, TooltipTrigger} from '@react-spectrum/tooltip';

const docItems = [{children: 'Document setup', name: '1'}, {children: 'Settings', name: '2'}];
const editItems = [{children: 'Edit', name: '1'}, {children: 'Copy', name: '2'}, {children: 'Delete', name: '3'}];
const viewItems2 = [{children: 'Grid view', name: '1'}, {children: 'List view', name: '2'}];
const viewItems = [{children: 'Grid view', name: '1'}, {children: 'List view', name: '2'}, {children: 'Gallery view', name: '3'}];
const dataItems = [{children: 'Properties', name: '1'}, {children: 'Info', name: '2'}, {children: 'Keywords', name: '3'}];
let onSelectionChange = action('onSelectionChange');


const meta: Meta = {
  title: 'ActionGroup',
  parameters: {
    providerSwitcher: {status: 'negative'}
  }
};

export default meta;

const Template: Story<SpectrumActionGroupProps<object>> = (args) => (
  <Flex rowGap="size-300" margin="size-100" width="100%" direction="column">
    <ActionGroupTextOnly {...args} />
    <ActionGroupBoth {...args} />
    <ActionGroupIconOnly {...args} />
  </Flex>
);

export const PropDefaults = Template.bind({});
PropDefaults.storyName = 'default';
PropDefaults.args = {items: docItems};
export const IsDisabled = Template.bind({});
IsDisabled.storyName = 'isDisabled';
IsDisabled.args = {isDisabled: true, defaultSelectedKeys: ['1'], items: docItems};
export const Compact = Template.bind({});
Compact.storyName = 'compact';
Compact.args = {density: 'compact', defaultSelectedKeys: ['1'], items: viewItems};
export const IsJustified = Template.bind({});
IsJustified.storyName = 'isJustified';
IsJustified.args = {isJustified: true, defaultSelectedKeys: ['1'], items: viewItems2};
export const CompactIsJustified = Template.bind({});
CompactIsJustified.storyName = 'compact, isJustified';
CompactIsJustified.args = {density: 'compact', isJustified: true, defaultSelectedKeys: ['1'], items: viewItems2};
export const IsQuiet = Template.bind({});
IsQuiet.storyName = 'isQuiet';
IsQuiet.args = {isQuiet: true, defaultSelectedKeys: ['1'], items: editItems};
export const CompactIsQuiet = Template.bind({});
CompactIsQuiet.storyName = 'compact, isQuiet';
CompactIsQuiet.args = {density: 'compact', isQuiet: true, defaultSelectedKeys: ['1'], items: editItems};
export const IsEmphasized = Template.bind({});
IsEmphasized.storyName = 'isEmphasized';
IsEmphasized.args = {isEmphasized: true, defaultSelectedKeys: ['1'], items: docItems};
export const CompactIsEmphasized = Template.bind({});
CompactIsEmphasized.storyName = 'compact, isEmphasized';
CompactIsEmphasized.args = {density: 'compact', isEmphasized: true, defaultSelectedKeys: ['1'], items: viewItems};
export const IsQuietIsEmphasized = Template.bind({});
IsQuietIsEmphasized.storyName = 'isQuiet, isEmphasized';
IsQuietIsEmphasized.args = {isQuiet: true, isEmphasized: true, defaultSelectedKeys: ['1'], items: viewItems};

export const SelectionModeMultiple = Template.bind({});
SelectionModeMultiple.storyName = 'selectionMode: multiple';
SelectionModeMultiple.args = {selectionMode: 'multiple', defaultSelectedKeys: ['1', '2'], items: dataItems};
export const SelectionModeSingleDisallowEmptySelection = Template.bind({});
SelectionModeSingleDisallowEmptySelection.storyName = 'selectionMode: single, disallowEmptySelection';
SelectionModeSingleDisallowEmptySelection.args = {selectionMode: 'single', disallowEmptySelection: true, defaultSelectedKeys: ['1'], items: dataItems};
export const SelectionModeMultipleIsQuiet = Template.bind({});
SelectionModeMultipleIsQuiet.storyName = 'selectionMode: multiple, isQuiet';
SelectionModeMultipleIsQuiet.args = {selectionMode: 'multiple', isQuiet: true, defaultSelectedKeys: ['1', '2'], items: dataItems};
export const SelectionModeMultipleCompactIsQuiet = Template.bind({});
SelectionModeMultipleCompactIsQuiet.storyName = 'selectionMode: multiple, isQuiet, compact';
SelectionModeMultipleCompactIsQuiet.args = {density: 'compact', selectionMode: 'multiple', isQuiet: true, defaultSelectedKeys: ['1', '2'], items: dataItems};
export const SelectionModeMultipleIsEmphasized = Template.bind({});
SelectionModeMultipleIsEmphasized.storyName = 'selectionMode: multiple, isEmphasized';
SelectionModeMultipleIsEmphasized.args = {isEmphasized: true, selectionMode: 'multiple', defaultSelectedKeys: ['1', '2'], items: dataItems};
export const SelectionModeMultipleCompactIsEmphasized = Template.bind({});
SelectionModeMultipleCompactIsEmphasized.storyName = 'selectionMode: multiple, isEmphasized, compact';
SelectionModeMultipleCompactIsEmphasized.args = {density: 'compact', isEmphasized: true, selectionMode: 'multiple', defaultSelectedKeys: ['1', '2'], items: dataItems};
export const SelectionModeMultipleIsQuietIsEmphasized = Template.bind({});
SelectionModeMultipleIsQuietIsEmphasized.storyName = 'selectionMode: multiple, isEmphasized, isQuiet';
SelectionModeMultipleIsQuietIsEmphasized.args = {isQuiet: true, isEmphasized: true, selectionMode: 'multiple', defaultSelectedKeys: ['1', '2'], items: dataItems};
export const SelectionModeMultipleCompactIsQuietIsEmphasized = Template.bind({});
SelectionModeMultipleCompactIsQuietIsEmphasized.storyName = 'selectionMode: multiple, isEmphasized, isQuiet, compact';
SelectionModeMultipleCompactIsQuietIsEmphasized.args = {density: 'compact', isQuiet: true, isEmphasized: true, selectionMode: 'multiple', defaultSelectedKeys: ['1', '2'], items: dataItems};
export const SelectionModeNone = Template.bind({});
SelectionModeNone.storyName = 'selectionMode: none';
SelectionModeNone.args = {selectionMode: 'none', items: editItems};

export const Vertical = Template.bind({});
Vertical.storyName = 'vertical';
Vertical.args = {orientation: 'vertical', items: docItems};
export const VerticalIsJustified = Template.bind({});
VerticalIsJustified.storyName = 'vertical, isJustified';
VerticalIsJustified.args = {orientation: 'vertical', isJustified: true, defaultSelectedKeys: ['1'], items: docItems};
export const VerticalCompact = Template.bind({});
VerticalCompact.storyName = 'vertical, compact';
VerticalCompact.args = {orientation: 'vertical', density: 'compact', defaultSelectedKeys: ['1'], items: viewItems};
export const VerticalIsJustifiedCompact = Template.bind({});
VerticalIsJustifiedCompact.storyName = 'vertical, isJustified, compact';
VerticalIsJustifiedCompact.args = {orientation: 'vertical', isJustified: true, density: 'compact', defaultSelectedKeys: ['1'], items: viewItems};
export const VerticalIsQuiet = Template.bind({});
VerticalIsQuiet.storyName = 'vertical, isQuiet';
VerticalIsQuiet.args = {orientation: 'vertical', isQuiet: true, defaultSelectedKeys: ['1'], items: editItems};
export const VerticalCompactIsQuiet = Template.bind({});
VerticalCompactIsQuiet.storyName = 'vertical, isQuiet, compact';
VerticalCompactIsQuiet.args = {orientation: 'vertical', density: 'compact', isQuiet: true, defaultSelectedKeys: ['1'], items: viewItems};

export const DisabledKeys = Template.bind({});
DisabledKeys.storyName = 'disabledKeys';
DisabledKeys.args = {disabledKeys: ['1', '2'], selectionMode: 'multiple', items: dataItems};


export const FalsyKey = () => (
  <ActionGroup onAction={action('onAction')}>
    <Item key="add">Add</Item>
    <Item key="">Delete</Item>
    <Item key="edit">Edit</Item>
  </ActionGroup>
);
FalsyKey.storyName = 'with falsy item key';

export const WithTooltips = () => (
  <ActionGroup selectionMode="single" onSelectionChange={onSelectionChange} items={docItems}>
    {(item) => {
      let IconElement = iconMap[item.children];
      return (
        <TooltipTrigger>
          <Item key={item.name} textValue={item.children} aria-label={item.children}>
            <IconElement />
          </Item>
          <Tooltip>{item.children}</Tooltip>
        </TooltipTrigger>
      );
    }}
  </ActionGroup>
);
WithTooltips.storyName = 'with tooltips';

const TestDefaultTemplate: Story<SpectrumActionGroupProps<object>> = (args) => (
  <ActionGroup {...args}>
    <Item key="1">Click me 1</Item>
    <Item key="2">Click me 2</Item>
  </ActionGroup>
);
export const TestDefault = TestDefaultTemplate.bind({});
TestDefault.storyName = 'test default';

const TestTemplate: Story<SpectrumActionGroupProps<object>> = (args) => (
  <ActionGroup {...args} >
    <Item data-testid="button-1" key="1">Click me 1</Item>
    <Item data-testid="button-2" key="">Click me 2</Item>
    <Item data-testid="button-3" key="3">Click me 3</Item>
  </ActionGroup>
);
export const TestThreeButtons = TestTemplate.bind({});
TestThreeButtons.storyName = 'test three buttons';

const TestTemplate4: Story<SpectrumActionGroupProps<object>> = (args) => (
  <ActionGroup {...args} >
    <Item key="0" data-testid="button-1">Click me 1</Item>
    <Item key="1" data-testid="button-2">Click me 2</Item>
    <Item key="2" data-testid="button-3">Click me 3</Item>
    <Item key="3" data-testid="button-4">Click me 4</Item>
  </ActionGroup>
);
export const TestFourButtons = TestTemplate4.bind({});
TestFourButtons.storyName = 'test four buttons';

const TestTemplateFocus: Story<SpectrumActionGroupProps<object>> = (args) => (
  <>
    <Button variant="primary" aria-label="ButtonBefore" />
    <ActionGroup {...args}>
      <Item key="1">Click me 1</Item>
      <Item key="2">Click me 2</Item>
    </ActionGroup>
    <Button variant="primary" aria-label="ButtonAfter" />
  </>
);
export const TestWithExternalFocus = TestTemplateFocus.bind({});
TestWithExternalFocus.storyName = 'test with external focusables';
