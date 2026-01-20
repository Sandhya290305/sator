import { useState, useEffect } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Plus, Square, Circle, Triangle, Image as ImageIcon, Type, Trash2 } from 'lucide-react';
import type { ValidationCriteria } from '../data/levels';

interface PowerPointSimulationProps {
  validationCriteria: ValidationCriteria;
  onValidate: (isValid: boolean) => void;
  taskId: number;
  levelNumber: number;
}

interface SlideElement {
  id: string;
  type: 'text' | 'shape' | 'image';
  content: string;
  x: number;
  y: number;
  width: number;
  height: number;
  shapeType?: 'rectangle' | 'circle' | 'triangle';
}

interface Slide {
  id: number;
  elements: SlideElement[];
}

// Template slides for different tasks
const TEMPLATE_SLIDES: { [key: string]: Slide[] } = {
  // Level 2 - PowerPoint Fundamentals
  '2-1': [{ id: 1, elements: [{ id: 'title-1', type: 'text', content: 'Click to add title', x: 50, y: 50, width: 400, height: 50 }] }],
  '2-2': [{ id: 1, elements: [{ id: 'title-1', type: 'text', content: 'Click to add title', x: 50, y: 50, width: 400, height: 50 }] }],
  
  // Level 4 - PowerPoint Design Mastery
  '4-1': [{ id: 1, elements: [{ id: 'title-1', type: 'text', content: 'Click to add title', x: 50, y: 30, width: 400, height: 50 }, { id: 'subtitle-1', type: 'text', content: 'Click to add subtitle', x: 50, y: 100, width: 400, height: 40 }] }],
  '4-3': [{ id: 1, elements: [{ id: 'title-1', type: 'text', content: 'Click to add title', x: 50, y: 30, width: 400, height: 50 }] }],
  
  // Level 6 - PowerPoint Multimedia
  '6-1': [{ id: 1, elements: [{ id: 'title-1', type: 'text', content: 'Click to add title', x: 50, y: 30, width: 400, height: 50 }] }],
  '6-3': [{ id: 1, elements: [{ id: 'title-1', type: 'text', content: 'Click to add title', x: 50, y: 30, width: 400, height: 50 }] }],
  '6-5': [{ id: 1, elements: [{ id: 'title-1', type: 'text', content: 'Click to add title', x: 50, y: 30, width: 400, height: 50 }] }],
  '6-7': [{ id: 1, elements: [{ id: 'title-1', type: 'text', content: 'Click to add title', x: 50, y: 30, width: 400, height: 50 }] }],
  '6-8': [{ id: 1, elements: [{ id: 'title-1', type: 'text', content: 'Click to add title', x: 50, y: 30, width: 400, height: 50 }] }],
  '6-9': [{ id: 1, elements: [{ id: 'title-1', type: 'text', content: 'Click to add title', x: 50, y: 30, width: 400, height: 50 }] }],
};

export function PowerPointSimulation({ validationCriteria, onValidate, taskId, levelNumber }: PowerPointSimulationProps) {
  const [slides, setSlides] = useState<Slide[]>([{ id: 1, elements: [] }]);
  const [currentSlideIndex, setCurrentSlideIndex] = useState(0);
  const [selectedElement, setSelectedElement] = useState<string | null>(null);

  const currentSlide = slides[currentSlideIndex];

  // Load template slides when task changes
  useEffect(() => {
    const templateKey = `${levelNumber}-${taskId}`;
    const templateSlides = TEMPLATE_SLIDES[templateKey];
    if (templateSlides) {
      setSlides(JSON.parse(JSON.stringify(templateSlides))); // Deep copy
    } else {
      setSlides([{ id: 1, elements: [] }]);
    }
    setCurrentSlideIndex(0);
    setSelectedElement(null);
  }, [taskId, levelNumber]);

  // Validate whenever slides change
  useEffect(() => {
    validatePresentation(slides);
  }, [slides, validationCriteria]);

  const addSlide = () => {
    const newSlide: Slide = {
      id: slides.length + 1,
      elements: []
    };
    setSlides([...slides, newSlide]);
    setCurrentSlideIndex(slides.length);
  };

  const addElement = (type: 'text' | 'shape' | 'image', shapeType?: 'rectangle' | 'circle' | 'triangle') => {
    const newElement: SlideElement = {
      id: `${type}-${Date.now()}`,
      type,
      content: type === 'text' ? 'Click to edit' : '',
      x: Math.random() * 300 + 50,
      y: Math.random() * 200 + 50,
      width: type === 'image' ? 150 : type === 'shape' ? 100 : 200,
      height: type === 'image' ? 150 : type === 'shape' ? 100 : 50,
      shapeType
    };

    const updatedSlides = [...slides];
    updatedSlides[currentSlideIndex].elements.push(newElement);
    setSlides(updatedSlides);
    setSelectedElement(newElement.id);
  };

  const updateElementText = (elementId: string, text: string) => {
    const updatedSlides = [...slides];
    const element = updatedSlides[currentSlideIndex].elements.find(el => el.id === elementId);
    if (element) {
      element.content = text;
      setSlides(updatedSlides);
    }
  };

  const deleteElement = (elementId: string) => {
    const updatedSlides = [...slides];
    updatedSlides[currentSlideIndex].elements = updatedSlides[currentSlideIndex].elements.filter(
      el => el.id !== elementId
    );
    setSlides(updatedSlides);
    setSelectedElement(null);
  };

  const validatePresentation = (currentSlides: Slide[]) => {
    let isValid = false;

    // Check slide count
    if (validationCriteria.expectedSlideCount) {
      isValid = currentSlides.length === validationCriteria.expectedSlideCount;
    }

    // Check text content
    if (validationCriteria.expectedTextContent) {
      const allText = currentSlides.flatMap(slide =>
        slide.elements.filter(el => el.type === 'text').map(el => el.content)
      );
      isValid = allText.some(text =>
        text.toLowerCase().includes(validationCriteria.expectedTextContent!.toLowerCase())
      );
    }

    // Check shape count
    if (validationCriteria.expectedShapeCount !== undefined) {
      const totalShapes = currentSlides.reduce(
        (count, slide) => count + slide.elements.filter(el => el.type === 'shape').length,
        0
      );
      isValid = totalShapes >= validationCriteria.expectedShapeCount;
    }

    // Check image count
    if (validationCriteria.expectedImageCount !== undefined) {
      const totalImages = currentSlides.reduce(
        (count, slide) => count + slide.elements.filter(el => el.type === 'image').length,
        0
      );
      isValid = totalImages >= validationCriteria.expectedImageCount;
    }

    // Combined validation: text + shapes
    if (
      validationCriteria.expectedTextContent &&
      validationCriteria.expectedShapeCount !== undefined
    ) {
      const hasText = currentSlides.some(slide =>
        slide.elements.some(
          el =>
            el.type === 'text' &&
            el.content.toLowerCase().includes(validationCriteria.expectedTextContent!.toLowerCase())
        )
      );
      const shapeCount = currentSlides.reduce(
        (count, slide) => count + slide.elements.filter(el => el.type === 'shape').length,
        0
      );
      isValid = hasText && shapeCount >= validationCriteria.expectedShapeCount;
    }

    // Combined validation: text + images
    if (
      validationCriteria.expectedTextContent &&
      validationCriteria.expectedImageCount !== undefined
    ) {
      const hasText = currentSlides.some(slide =>
        slide.elements.some(
          el =>
            el.type === 'text' &&
            el.content.toLowerCase().includes(validationCriteria.expectedTextContent!.toLowerCase())
        )
      );
      const imageCount = currentSlides.reduce(
        (count, slide) => count + slide.elements.filter(el => el.type === 'image').length,
        0
      );
      isValid = hasText && imageCount >= validationCriteria.expectedImageCount;
    }

    // Combined validation: slides + shapes + images
    if (
      validationCriteria.expectedSlideCount &&
      validationCriteria.expectedShapeCount !== undefined &&
      validationCriteria.expectedImageCount !== undefined
    ) {
      const slideCountValid = currentSlides.length === validationCriteria.expectedSlideCount;
      const totalShapes = currentSlides.reduce(
        (count, slide) => count + slide.elements.filter(el => el.type === 'shape').length,
        0
      );
      const totalImages = currentSlides.reduce(
        (count, slide) => count + slide.elements.filter(el => el.type === 'image').length,
        0
      );
      isValid =
        slideCountValid &&
        totalShapes >= validationCriteria.expectedShapeCount &&
        totalImages >= validationCriteria.expectedImageCount;
    }

    onValidate(isValid);
  };

  const renderElement = (element: SlideElement) => {
    const isSelected = selectedElement === element.id;

    if (element.type === 'text') {
      return (
        <div
          key={element.id}
          onClick={() => setSelectedElement(element.id)}
          style={{
            position: 'absolute',
            left: element.x,
            top: element.y,
            width: element.width,
            height: element.height
          }}
          className={`cursor-pointer transition-all ${
            isSelected ? 'ring-2 ring-primary shadow-glow' : ''
          }`}
        >
          {isSelected ? (
            <Input
              value={element.content}
              onChange={(e) => updateElementText(element.id, e.target.value)}
              className="h-full bg-white/90 text-black border-primary"
              autoFocus
            />
          ) : (
            <div className="h-full flex items-center justify-center bg-white/80 text-black px-2 rounded border-2 border-gray-300">
              {element.content}
            </div>
          )}
        </div>
      );
    }

    if (element.type === 'shape') {
      return (
        <div
          key={element.id}
          onClick={() => setSelectedElement(element.id)}
          style={{
            position: 'absolute',
            left: element.x,
            top: element.y,
            width: element.width,
            height: element.height
          }}
          className={`cursor-pointer transition-all ${
            isSelected ? 'ring-2 ring-primary shadow-glow' : ''
          }`}
        >
          {element.shapeType === 'circle' && (
            <div className="w-full h-full rounded-full bg-blue-500 border-2 border-blue-700" />
          )}
          {element.shapeType === 'rectangle' && (
            <div className="w-full h-full bg-green-500 border-2 border-green-700" />
          )}
          {element.shapeType === 'triangle' && (
            <div
              className="w-0 h-0 border-l-[50px] border-r-[50px] border-b-[100px] border-l-transparent border-r-transparent border-b-red-500"
              style={{ borderBottomWidth: element.height, borderLeftWidth: element.width / 2, borderRightWidth: element.width / 2 }}
            />
          )}
        </div>
      );
    }

    if (element.type === 'image') {
      return (
        <div
          key={element.id}
          onClick={() => setSelectedElement(element.id)}
          style={{
            position: 'absolute',
            left: element.x,
            top: element.y,
            width: element.width,
            height: element.height
          }}
          className={`cursor-pointer transition-all bg-gray-300 border-2 border-gray-500 flex items-center justify-center ${
            isSelected ? 'ring-2 ring-primary shadow-glow' : ''
          }`}
        >
          <ImageIcon className="h-12 w-12 text-gray-600" />
        </div>
      );
    }
  };

  return (
    <Card className="border-2 border-primary/50 bg-black/60 shadow-glow">
      <CardHeader className="bg-gradient-to-r from-primary/20 to-transparent border-b border-primary/30">
        <CardTitle className="text-red-100">PowerPoint Simulation</CardTitle>
      </CardHeader>
      <CardContent className="space-y-4 pt-6">
        {/* Toolbar */}
        <div className="flex flex-wrap gap-2">
          <Button
            onClick={addSlide}
            size="sm"
            className="bg-primary hover:bg-primary/90"
          >
            <Plus className="h-4 w-4 mr-1" />
            New Slide
          </Button>
          <Button
            onClick={() => addElement('text')}
            size="sm"
            variant="outline"
            className="border-primary/50 text-red-300 hover:bg-primary/20"
          >
            <Type className="h-4 w-4 mr-1" />
            Text Box
          </Button>
          <Button
            onClick={() => addElement('shape', 'rectangle')}
            size="sm"
            variant="outline"
            className="border-primary/50 text-red-300 hover:bg-primary/20"
          >
            <Square className="h-4 w-4 mr-1" />
            Rectangle
          </Button>
          <Button
            onClick={() => addElement('shape', 'circle')}
            size="sm"
            variant="outline"
            className="border-primary/50 text-red-300 hover:bg-primary/20"
          >
            <Circle className="h-4 w-4 mr-1" />
            Circle
          </Button>
          <Button
            onClick={() => addElement('shape', 'triangle')}
            size="sm"
            variant="outline"
            className="border-primary/50 text-red-300 hover:bg-primary/20"
          >
            <Triangle className="h-4 w-4 mr-1" />
            Triangle
          </Button>
          <Button
            onClick={() => addElement('image')}
            size="sm"
            variant="outline"
            className="border-primary/50 text-red-300 hover:bg-primary/20"
          >
            <ImageIcon className="h-4 w-4 mr-1" />
            Insert Image
          </Button>
          {selectedElement && (
            <Button
              onClick={() => deleteElement(selectedElement)}
              size="sm"
              variant="destructive"
              className="ml-auto"
            >
              <Trash2 className="h-4 w-4 mr-1" />
              Delete
            </Button>
          )}
        </div>

        {/* Slide Navigation */}
        <div className="flex gap-2 overflow-x-auto pb-2">
          {slides.map((slide, index) => (
            <Button
              key={slide.id}
              onClick={() => setCurrentSlideIndex(index)}
              size="sm"
              variant={index === currentSlideIndex ? 'default' : 'outline'}
              className={
                index === currentSlideIndex
                  ? 'bg-primary hover:bg-primary/90'
                  : 'border-primary/50 text-red-300 hover:bg-primary/20'
              }
            >
              Slide {slide.id}
            </Button>
          ))}
        </div>

        {/* Slide Canvas */}
        <div className="relative w-full h-[400px] bg-white border-4 border-primary/30 rounded-lg overflow-hidden">
          {currentSlide.elements.map(renderElement)}
          {currentSlide.elements.length === 0 && (
            <div className="absolute inset-0 flex items-center justify-center text-gray-400 text-lg">
              Click buttons above to add elements to your slide
            </div>
          )}
        </div>

        {/* Slide Info */}
        <div className="text-sm text-red-300 space-y-1">
          <p>Total Slides: {slides.length}</p>
          <p>Current Slide Elements: {currentSlide.elements.length}</p>
          <p>
            Shapes: {currentSlide.elements.filter(el => el.type === 'shape').length} | Images:{' '}
            {currentSlide.elements.filter(el => el.type === 'image').length} | Text Boxes:{' '}
            {currentSlide.elements.filter(el => el.type === 'text').length}
          </p>
        </div>
      </CardContent>
    </Card>
  );
}
