export const ItemsTypes = { 
    AdUnit: { id: 0, name: 'AdUnit' }, 
    AdSlot: { id: 1, name: 'AdSlot' }, 
    Campaign: { id: 2, name: 'Campaign' }, 
    Channel: { id: 3, name: 'Channel' } 
}

export const Sizes = [
    { value: '300x300', label: '300 x 300 px' },
    { value: '200x200', label: '200 x 200 px'},
    { value: '100x100', label: '100 x 100 px' },
    { value: '728x90', label: '728 x 90 px'}
  ];
export const AdTypes =[
    { value: 'html', label: 'HTML' },
    { value: 'flash', label: 'Flash'},
    { value: 'other', label: 'Other' },
    { value: 'vr', label: 'VR'}
  ];

// ['AdUnit', 'AdSlot', 'Campaign', 'Channel'] 