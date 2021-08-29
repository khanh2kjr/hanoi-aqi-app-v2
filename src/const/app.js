export const RADIUS_OF_THE_EARTH = 6371

export const EVALUATE = [
  {
    rank: '0-50',
    label: 'Tốt',
    text: 'Chất lượng không khí được coi là đạt yêu cầu và ô nhiễm không khí gây ra là ít hoặc không có rủi ro',
    color: {
      label: 'Xanh',
      value: '#009966',
    },
  },
  {
    rank: '51-100',
    label: 'Trung bình',
    text: 'Chất lượng không khí ở mức chấp nhận được. Tuy nhiên, đối với một số chất ô nhiễm, đối với một số người nhạy cảm bất thường với ô nhiễm không khí thì cần phải đề phòng.',
    color: {
      label: 'Vàng',
      value: '#FFDE33',
    },
  },
  {
    rank: '101-150',
    label: 'Kém',
    text: 'Những người nhạy cảm có thể bị ảnh hưởng đến sức khỏe. Nói chung ít có khả năng bị ảnh hưởng.',
    color: {
      label: 'Cam',
      value: '#FF9933',
    },
  },
  {
    rank: '151-200',
    label: 'Xấu',
    text: 'Những người bình thường bắt đầu có các ảnh hưởng tới sức khỏe, nhóm người nhạy cảm có thể gặp những vấn đề sức khỏe nghiêm trọng hơn.',
    color: {
      label: 'Đỏ',
      value: '#CC0033',
    },
  },
  {
    rank: '201-300',
    label: 'Rất xấu',
    text: 'Cảnh báo hưởng tới sức khỏe: mọi người bị ảnh hưởng tới sức khỏe nghiêm trọng hơn.',
    color: {
      label: 'Tím',
      value: '#660099',
    },
  },
  {
    rank: '301-500',
    label: 'Nguy hại',
    text: 'Cảnh báo hưởng tới sức khỏe: mọi người bị ảnh hưởng tới sức khỏe nghiêm trọng hơn.',
    color: {
      label: 'Nâu',
      value: '#7E0023',
    },
  },
]
