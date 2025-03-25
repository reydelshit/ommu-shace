export const getAttendanceButtonColor = (status: string) => {
  switch (status) {
    case 'PENDING':
      return 'bg-yellow-400 hover:bg-yellow-500';
    case 'APPROVED':
      return 'bg-green-400 hover:bg-green-500';
    case 'CHECKED_IN':
      return 'bg-blue-400 hover:bg-blue-500';
    case 'REJECTED':
      return 'bg-red-400 hover:bg-red-500';
    default:
      return 'bg-black hover:bg-gray-900';
  }
};
