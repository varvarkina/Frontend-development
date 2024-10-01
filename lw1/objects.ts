type Slide = {
    id: string,
    background: Background,
    content?: SlideElement[]
}

type Presentation = {
    title: string,
    slideCollection: Slide[],
    selected: Selected
}

type Selected = {
    selectedSlideId: string
}

type Background = {
    value: string,
    type: 'solid' | 'image'
}

type SlideObj = {
    position: {
        x: number,
        y: number
    },
    size: {
        width: number,
        height: number
    },
    id: string
}

type Image = SlideObj & {
    src: string,
    type: 'image'
}

type SlideText = SlideObj & {
    value: string,
    fontFamily: string,
    type: 'text'
}

type SlideElement = Image | SlideText

const presentation: Presentation = {
    title: 'Название презентации',
    slideCollection: [
        {
            id: 'slide1',
            background: {
                value: '#FFFFFF',
                type: 'solid'
            }
        },
        {
            id: 'slide2',
            background: {
                value: '#FFFFFF',
                type: 'solid'
            }
        }
    ],
    selected: { 
        selectedSlideId: 'slide1'
    }
}

const imageElement: Image = {
    src: 'path/to/image.jpg',
    type: 'image',
    position: { x: 100, y: 100 },
    size: { width: 200, height: 150 },
    id: 'image-1'
}

const textElement: SlideText = {
    value: 'This is some text',
    fontFamily: 'Arial',
    type: 'text',
    position: { x: 300, y: 200 },
    size: { width: 300, height: 50 },
    id: 'text-1'
}

function renamePresentationTitle(newTitle: string, presentation: Presentation): Presentation {
    return {
        ...presentation,
        title: newTitle
    }
}

function addSlide(presentation: Presentation): Presentation {
    let i = 1
    let newSlideId = `slide${presentation.slideCollection.length + i}`

    while (presentation.slideCollection.some(slide => slide.id === newSlideId)) {
        i++
        newSlideId = `slide${presentation.slideCollection.length + i}`
    }

    const newSlide: Slide = {
      id: newSlideId,
      background: { 
        value: '#FFFFFF',
        type: 'solid'
      },
      content: [] 
    }
  
    return {
      ...presentation,
      slideCollection: [...presentation.slideCollection, newSlide]
    }
}
  
function deleteSlide(presentation: Presentation, slideId: string): Presentation {
    const slideIndex = presentation.slideCollection.findIndex(slide => slide.id === slideId)

    if (slideIndex === -1) {
      return presentation
    }

    const newSlideCollection = [
      ...presentation.slideCollection.slice(0, slideIndex),
      ...presentation.slideCollection.slice(slideIndex + 1)
    ]

    return {
      ...presentation,
      slideCollection: newSlideCollection
    }
}

function changeSlidePosition(newIndex: number, presentation: Presentation): Presentation {
    if (newIndex < 0 || newIndex >= presentation.slideCollection.length) {
        console.log('Недопустимый индекс слайда')
        return presentation
    }
    const selectedSlideId = presentation.selected.selectedSlideId
    const selectedSlideIndex = presentation.slideCollection.findIndex(slide => slide.id === selectedSlideId)

    if (selectedSlideIndex === -1) {
        return presentation
    }

    const updatedSlideCollection = [...presentation.slideCollection]
    const selectedSlide = updatedSlideCollection[selectedSlideIndex]

    updatedSlideCollection.splice(selectedSlideIndex, 1)
    updatedSlideCollection.splice(newIndex, 0, selectedSlide)

    return {
        ...presentation,
        slideCollection: updatedSlideCollection
    }
}

function generateUniqueId(): string {
    return crypto.randomUUID()
}
    
function addContentToSlide(presentation: Presentation, slideId: string, element: SlideElement): Presentation {
    const newId = generateUniqueId()
    const updatedElement = { 
        ...element, 
        id: newId 
    }
    const updatedSlideCollection = presentation.slideCollection.map(slide => {
        if (slide.id === slideId) {
            return {
                ...slide,
                content: slide.content ? [...slide.content, updatedElement] : [updatedElement]
            }
        }
        return slide
    })
    return { 
        ...presentation, 
        slideCollection: updatedSlideCollection 
    }
}    

function removeContentFromSlide(presentation: Presentation, slideId: string, elementId: string): Presentation {
    const updatedSlideCollection = presentation.slideCollection.map(slide => {
        if (slide.id === slideId) {
            const updatedContent = slide.content?.filter(element => element.id !== elementId)
            return {
                ...slide,
                content: updatedContent
            }
        }
        return slide
    })
    return { 
        ...presentation, 
        slideCollection: updatedSlideCollection 
    }
}

function changeElementPosition(
    slideId: string,
    elementId: string,
    newPosition: { x: number; y: number },
    presentation: Presentation
): Presentation {
    return {
        ...presentation,
        slideCollection: presentation.slideCollection.map(slide => {
            if (slide.id === slideId) {
                return {
                    ...slide,
                    content: slide.content?.map(element => {
                        if (element.id === elementId) {
                            return {
                                ...element,
                                position: newPosition 
                            }
                        }
                        return element
                    })
                }
            }
            return slide
        })
    }
}

function changeElementSize(
    slideId: string,
    elementId: string,
    newSize: { width: number; height: number },
    presentation: Presentation
): Presentation {
    return {
        ...presentation,
        slideCollection: presentation.slideCollection.map(slide => {
            if (slide.id === slideId) {
                return {
                    ...slide,
                    content: slide.content?.map(element => {
                        if (element.id === elementId) {
                            return {
                                ...element,
                                size: newSize 
                            }
                        }
                        return element
                    })
                }
            }
            return slide
        })
    }
}

function changeSlideText(
    slideId: string,
    elementId: string,
    newValue: string,
    presentation: Presentation
): Presentation {
    return {
        ...presentation,
        slideCollection: presentation.slideCollection.map(slide => {
            if (slide.id === slideId) {
                return {
                    ...slide,
                    content: slide.content?.map(element => {
                        if (element.id === elementId) {
                            return {
                                ...element,
                                value: newValue
                            }
                        }
                        return element
                    })
                }
            }
            return slide
        })
    }
}

function changeFontFamily(
    slideId: string,
    elementId: string,
    newFontFamily: string,
    presentation: Presentation
): Presentation {
    return {
        ...presentation,
        slideCollection: presentation.slideCollection.map(slide => {
            if (slide.id === slideId) {
                return {
                    ...slide,
                    content: slide.content?.map(element => {
                        if (element.id === elementId) {
                            return {
                                ...element,
                                value: newFontFamily
                            }
                        }
                        return element
                    })
                }
            }
            return slide
        })
    }
}

function updateSlideBackground(presentation: Presentation, slideId: string, newBackground: Background): Presentation {
    const updatedSlideCollection = presentation.slideCollection.map(slide => {
        if (slide.id === slideId) {
            return {
                ...slide,
                background: newBackground
            }
        }
        return slide
    })

    return {
        ...presentation,
        slideCollection: updatedSlideCollection
    }
}

console.log(`Presentation: ${JSON.stringify(presentation)}\n`)

const presentationWithNewTitle: Presentation = renamePresentationTitle('Новое название презентации', presentation)
console.log(`Presentation: ${JSON.stringify(presentationWithNewTitle)}\n`)

const presentationWithNewSlide = addSlide(presentationWithNewTitle)
console.log(`Presentation with new slide: ${JSON.stringify(presentationWithNewSlide)}\n`)

const presentationDeletedSlide = deleteSlide(presentationWithNewSlide, 'slide2')
console.log(`Presentation without deleted slide: ${JSON.stringify(presentationDeletedSlide)}\n`)

const presentationSlidePosition = changeSlidePosition(1, presentationDeletedSlide)
console.log(`Presentation change Slide Position: ${JSON.stringify(presentationSlidePosition)}\n`)

const presentationWithImage = addContentToSlide(presentation, 'slide2', imageElement)
console.log(`Presentation with Image: ${JSON.stringify(presentationWithImage)}\n`)

const presentationWithText = addContentToSlide(presentationWithImage, 'slide1', textElement)
console.log(`Presentation with Text: ${JSON.stringify(presentationWithText)}\n`)

const presentationRemoveText = removeContentFromSlide(
    presentationWithText, 
    'slide1', 
    presentationWithText.slideCollection[0].content[0].id
)
const presentationRemoveImage = removeContentFromSlide(
    presentationRemoveText, 
    'slide2', 
    presentationRemoveText.slideCollection[1].content[0].id
)
console.log(`Presentation without removed content: ${JSON.stringify(presentationRemoveImage)}\n`)

const presentationChangeElPos = changeElementPosition(
    'slide1',
    presentationWithText.slideCollection[0].content[0].id,
    { x: 100, y: 200 },
    presentationWithText
)
console.log(`Changing element position: ${JSON.stringify(presentationChangeElPos)}\n`)

const presentationChangeElSize = changeElementSize(
    'slide2',
    presentationWithImage.slideCollection[1].content[0].id,
    { width: 300, height: 200 },
    presentationWithImage
)
console.log(`Changing element size: ${JSON.stringify(presentationChangeElSize)}\n`)

const presentationWithNewText = changeSlideText(
    'slide1',
    presentationWithText.slideCollection[0].content[0].id,
    'New text',
    presentationWithText
)
console.log(`Changing slide text: ${JSON.stringify(presentationWithNewText)}\n`)

const presentationWithNewFontFamily = changeSlideText(
    'slide1',
    presentationWithText.slideCollection[0].content[0].id,
    'Oxygen',
    presentationWithText
)
console.log(`Changing font family: ${JSON.stringify(presentationWithNewFontFamily)}\n`)

const presentationWithSolidBg = updateSlideBackground(presentation, 'slide1', { value: '#FF0000', type: 'solid' })
console.log(`Changing background on solid: ${JSON.stringify(presentationWithSolidBg)}\n`)

const presentationWithImageBg = updateSlideBackground(presentationWithSolidBg, 'slide2', {
    value: 'path/to/new-background-image.jpg',
    type: 'image'
})
console.log(`Changing background on image: ${JSON.stringify(presentationWithImageBg)}\n`)