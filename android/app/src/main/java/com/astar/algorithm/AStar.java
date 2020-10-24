package com.astar.algorithm;

import android.os.Build;

import androidx.annotation.RequiresApi;

import java.util.ArrayList;
import java.util.Collections;
import java.util.List;
import java.util.PriorityQueue;

public class AStar {
    public static final int DIAGONAL_COST = 9;
    public static final int V_H_COST = 7;

    static class Cell {
        int heuristicCost = 0; //Heuristic cost
        int finalCost = 0; //G+H
        int x, y;
        Cell parent;

        Cell(int x, int y) {
            this.x = x;
            this.y = y;
        }

        @Override
        public String toString() {
            return "[" + this.x + ", " + this.y + "]";
        }
    }

    //Blocked cells are just null Cell values in grid
    static Cell[][] grid = new Cell[5][5];

    static PriorityQueue<Cell> open;

    static boolean closed[][];
    static int startI, startJ;
    static int endI, endJ;

    public static void setBlocked(int i, int j) {
        grid[i][j] = null;
    }

    public static void setStartCell(int i, int j) {
        startI = i;
        startJ = j;
    }

    public static void setEndCell(int i, int j) {
        endI = i;
        endJ = j;
    }

    static void checkAndUpdateCost(Cell current, Cell t, int cost) {
        if (t == null || closed[t.x][t.y]) return;
        int t_final_cost = t.heuristicCost + cost;

        boolean inOpen = open.contains(t);
        if (!inOpen || t_final_cost < t.finalCost) {
            t.finalCost = t_final_cost;
            t.parent = current;
            if (!inOpen) open.add(t);
        }
    }

    public static void AStar() {

        //add starting point to open list
        open.add(grid[startI][startJ]);

        Cell current;

        while (open.size() != 0) {
            //while(true){
            current = open.poll();
            if (current == null) break;
            closed[current.x][current.y] = true;

            if (current.equals(grid[endI][endJ])) {
                return;
            }

            Cell t;
            if (current.x - 1 >= 0) {
                t = grid[current.x - 1][current.y];
                checkAndUpdateCost(current, t, current.finalCost + V_H_COST);

                if (current.y - 1 >= 0) {
                    t = grid[current.x - 1][current.y - 1];
                    checkAndUpdateCost(current, t, current.finalCost + DIAGONAL_COST);
                }

                if (current.y + 1 < grid[0].length) {
                    t = grid[current.x - 1][current.y + 1];
                    checkAndUpdateCost(current, t, current.finalCost + DIAGONAL_COST);
                }
            }

            if (current.y - 1 >= 0) {
                t = grid[current.x][current.y - 1];
                checkAndUpdateCost(current, t, current.finalCost + V_H_COST);
            }

            if (current.y + 1 < grid[0].length) {
                t = grid[current.x][current.y + 1];
                checkAndUpdateCost(current, t, current.finalCost + V_H_COST);
            }

            if (current.x + 1 < grid.length) {
                t = grid[current.x + 1][current.y];
                checkAndUpdateCost(current, t, current.finalCost + V_H_COST);

                if (current.y - 1 >= 0) {
                    t = grid[current.x + 1][current.y - 1];
                    checkAndUpdateCost(current, t, current.finalCost + DIAGONAL_COST);
                }

                if (current.y + 1 < grid[0].length) {
                    t = grid[current.x + 1][current.y + 1];
                    checkAndUpdateCost(current, t, current.finalCost + DIAGONAL_COST);
                }
            }
        }
    }

    /*
    Params :
    tCase = runTest case No.
    x, y = Board's dimensions
    si, sj = start location's x and y coordinates
    ei, ej = end location's x and y coordinates
    int[][] blocked = array containing inaccessible cell coordinates
    */
    @RequiresApi(api = Build.VERSION_CODES.N)
    public static void runTest(int tCase, int x, int y, int si, int sj, int ei, int ej, int[][] blocked) {
        System.out.println("\n\nTest number " + tCase);
        setUpInitialData(x, y);
        setStartCell(si, sj);
        setEndCell(ei, ej);

        setGridCellsAndHeuristicCost(x, y);
        grid[si][sj].finalCost = 0;

        setBlockedCells(blocked);
        displayInitialGrid(x, y, si, sj, ei, ej);
        AStar();
        displayResultsForCells(x);
        displayPath();
    }

    @RequiresApi(api = Build.VERSION_CODES.N)
    private static void setUpInitialData(int x, int y) {
        grid = new Cell[x][y];
        closed = new boolean[x][y];
        open = new PriorityQueue<>((Object o1, Object o2) -> {
            Cell c1 = (Cell) o1;
            Cell c2 = (Cell) o2;

            return Integer.compare(c1.finalCost, c2.finalCost);
        });
    }

    private static void setGridCellsAndHeuristicCost(int x, int y) {
        for (int i = 0; i < x; ++i) {
            for (int j = 0; j < y; ++j) {
                grid[i][j] = new Cell(i, j);
                grid[i][j].heuristicCost = Math.abs(i - endI) + Math.abs(j - endJ);
            }
        }
    }

    private static void setBlockedCells(int[][] blocked) {
        /*
             Set blocked cells. Simply set the cell values to null
             for blocked cells.
        */
        for (int i = 0; i < blocked.length; ++i) {
            setBlocked(blocked[i][0], blocked[i][1]);
        }
    }

    @RequiresApi(api = Build.VERSION_CODES.N)
    private static void displayPath() {
        if (closed[endI][endJ]) {
            //Trace back the path
            List<Cell> path = new ArrayList();
            System.out.println("Full path: ");
            Cell current = grid[endI][endJ];
            path.add(current);

            //System.out.print(current+ "\n");
            while (current.parent != null) {
                path.add(current.parent);
                //System.out.print(" -> "+current.parent);
                current = current.parent;
            }
            Collections.reverse(path);
            path.forEach(cell -> System.out.println("[" + cell.y + "," + cell.x + "]"));

            System.out.println();
        } else System.out.println("No possible E2E path");
    }

    private static void displayResultsForCells(int x) {
        System.out.println("\nResults for cells: ");
        for (int i = 0; i < x; ++i) {
            for (int j = 0; j < x; ++j) {
                if (grid[i][j] != null) System.out.printf("%-3d ", grid[i][j].finalCost);
                else System.out.print("BL  ");
            }
            System.out.println();
        }
        System.out.println();
    }

    private static void displayInitialGrid(int x, int y, int si, int sj, int ei, int ej) {
        System.out.println("Grid: ");
        for (int i = 0; i < x; ++i) {
            for (int j = 0; j < y; ++j) {
                if (i == si && j == sj) System.out.print("S  "); //punkt początkowy
                else if (i == ei && j == ej) System.out.print("D  ");  //punkt końcowy
                else if (grid[i][j] != null) System.out.printf("%-2d ", 0);
                else System.out.print("#  ");
            }
            System.out.println();
        }
        System.out.println();
    }

    @RequiresApi(api = Build.VERSION_CODES.N)
    public static void main(String[] args) throws Exception {
        runTest(1, 5, 5, 0, 0, 3, 2, new int[][]{{0, 4}, {2, 2}, {3, 1}, {3, 3}});
        runTest(2, 5, 5, 0, 0, 4, 4, new int[][]{{0, 4}, {2, 2}, {3, 1}, {3, 3}});
        runTest(3, 7, 7, 2, 1, 5, 4, new int[][]{{4, 1}, {4, 3}, {5, 3}, {2, 3}});
        runTest(4, 5, 5, 0, 0, 4, 4, new int[][]{{3, 4}, {3, 3}, {4, 3}});
        runTest(5, 10, 10, 0, 9, 9, 0, new int[][]{{4, 2}, {5, 2}, {6, 2}, {7, 2}, {7, 3}, {7, 4}, {7, 5}, {7, 6}});
    }
}

