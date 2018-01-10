package com.ikunativeapp;

import android.animation.Animator;
import android.animation.ObjectAnimator;
import android.content.Context;
import android.util.Log;

import com.facebook.react.views.view.ReactViewGroup;

/**
 * Created by smancebo on 1/9/18.
 */

public class ScrollListView extends ReactViewGroup {


    public float getOffsetX() {
        return offsetX;
    }
    public void setOffsetX(float offsetX) {
        this.offsetX = offsetX;
    }
    public float getOffsetY() {
        return offsetY;
    }
    public void setOffsetY(float offsetY) {
        this.offsetY = offsetY;
    }

    public int getOffsetElement() {
        return offsetElement;
    }

    public void setOffsetElement(int offsetElement) {
        this.offsetElement = offsetElement;
    }

    enum Direction  {
        HORIZONTAL,
        VERTICAL
    }

    private float moveValue = 0;
    private Direction direction;
    private float lastPosition = 0;
    private float offsetX = 0;
    private float offsetY = 0;
    private int offsetElement = 0;

    public ScrollListView(Context context) {
        super(context);
        setX(offsetX);
        setY(offsetY);

    }

    public void scrollList(int position){
        final int childrens = this.getChildCount();
        if(position > (childrens - 1) || position < 0){
            return ;
        }

        float currentPosition = 0;

        if(position >= offsetElement ) {

            switch (direction) {
                case HORIZONTAL:

                    currentPosition = (((position - offsetElement) * this.moveValue) - offsetX) * -1;

                    translateList(currentPosition);

                    break;

                case VERTICAL:
//
                    currentPosition = (((position - offsetElement) * this.moveValue) - offsetY) * -1;

                    translateList(currentPosition);
                    break;
            }

        }else if(position == 0) {
            currentPosition  = direction == Direction.HORIZONTAL ? offsetX : offsetY;
            translateList(currentPosition);
        }


    }

    public void translateList(float to){
//        TranslateAnimation animation = new TranslateAnimation(fromX, toX, fromY, toY);
//        animation.setDuration(200);
//        animation.setFillAfter(true);
        ObjectAnimator animator = null;

        if(direction.equals(Direction.HORIZONTAL)){
            animator =  ObjectAnimator.ofFloat(this, "x", to);
        }else if(direction.equals(Direction.VERTICAL)) {
            animator = ObjectAnimator.ofFloat(this, "y", to);
        }

        animator.addListener(new Animator.AnimatorListener() {
            @Override
            public void onAnimationStart(Animator animation) {
                Log.d("Start Y", String.valueOf(getY()));
            }

            @Override
            public void onAnimationEnd(Animator animation) {
                Log.d("End Y", String.valueOf(getY()));
            }

            @Override
            public void onAnimationCancel(Animator animation) {

            }

            @Override
            public void onAnimationRepeat(Animator animation) {

            }
        });
        animator.setDuration(200);
        animator.start();

        //this.startAnimation(animation);
    }


    @Override
    protected void onAnimationEnd() {
        super.onAnimationEnd();

    }

    public float getMoveValue() {
        return moveValue;
    }

    public void setMoveValue(float moveValue) {
        this.moveValue = moveValue;
    }

    public Direction getDirection() {
        return direction;
    }

    public void setDirection(Direction direction) {
        this.direction = direction;
//        switch(direction){
//            case HORIZONTAL:
//                this.setOrientation(HORIZONTAL);
//                break;
//            case VERTICAL:
//                this.setOrientation(VERTICAL);
//                break;
//        }
//        this.setOrientation();
    }
}
