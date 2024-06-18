export const getNotificationData = (data = {}) => ({
  // ----------------- community -----------------
  get COMMUNITY_CREATE() {
    const payload = JSON.parse(
      data.payload?.id ? JSON.stringify(data.payload) : data.payload
    ) || {};
    return {
      ...data,
      payload,
      notificationImage: payload.avatar,
      redirectUrl: `/app/community/all/${payload.id}`,
    };
  },
});
