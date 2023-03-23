// burada ihtiyacım olmayanları istemediğimden state'imde tutmak istemiyorum.
// onları ayıklayıp ihtiyacım olanı alıyorum ve dönüyorum.
export const parseStoryModels = (stories) => {
  return stories.map(({ title, image, items }) => {
    const model = {
      title,
      image,
      items: items.map(({ desktopImage, duration, linkTitle, url, type }) => ({
        image: desktopImage,
        duration: duration,
        link:
          linkTitle != null && url != null ? { title: linkTitle, url } : null,
        storyType: type,
        isSeen: false,
      })),
    };
    return model;
  });
};
