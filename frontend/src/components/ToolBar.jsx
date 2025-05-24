import React from 'react';

const CustomToolbar = (props) => {
  // These props come from the toolbarPlugin renderToolbar slot
  const {
    ToolbarSlot, // The whole toolbar slot, from which we pick the buttons
  } = props;

  // Destructure buttons from ToolbarSlot (passed by toolbarPlugin)
  const {
    GoToFirstPage,
    GoToPreviousPage,
    CurrentPageInput,
    NumberOfPages,
    GoToNextPage,
    GoToLastPage,
    ZoomOut,
    ZoomPopover,
    ZoomIn,
    Print,
    // We won’t use this one
  } = ToolbarSlot;

  return (
    <div className="flex items-center space-x-4 p-2 bg-gray-100 border-b rounded-t">
      <GoToFirstPage />
      <GoToPreviousPage />
      <CurrentPageInput />
      <NumberOfPages />
      <GoToNextPage />
      <GoToLastPage />

      <ZoomOut />
      <ZoomPopover />
      <ZoomIn />

      <Print />
      {/* No Download button */}
    </div>
  );
};

export default CustomToolbar;
